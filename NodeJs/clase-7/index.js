import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-respository.js'

const app = express()

// Especificar el sistema de plantillas
app.set('view engine', 'ejs')

// Procesar el body de las peticiones
app.use(express.json())
// Inicializar las cookies
app.use(cookieParser())

// Verificar la sesion para todas las rutas(end-points)
app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch {}

  next() // Seguir a la siguiente ruta o middleware
})

app.get('/', (req, res) => {
  const { user } = req.session
  res.render('index', user)
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      }
    )
    res
      .cookie('access_token', token, {
        httpOnly: true, // la cookie solo se puede acceder en el servidor
        secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en HTTPS
        sameSite: 'strict', // la cookie solo se puede acceder en el mismo dociminio
        maxAge: 1000 * 60 * 60 // la cookie tiene un tiempo de validez de 1 hora
      })
      .send({ user })
  } catch (error) {
    res.status(401).send(error.message)
  }
})
app.post('/register', async (req, res) => {
  const { username, password } = req.body
  console.log(req.body)

  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    // No se debe mandar el error, (porque puede ser informacion
    // sensible que no deben ver los usuarios)
    res.status(400).send(error.message)
  }
})

// * Cerrar Sesion *
app.post('/logout', (req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: 'Logout successful' })
})

// * Solo usuarios logueados pueden ver esta ruta *
app.get('/protected', (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Access not authorized!')
  res.render('protected', user)
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})