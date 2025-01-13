import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-respository.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.post('/login', (req, res) => {
  res.json({ user: 'bryan' })
})
app.post('/register', (req, res) => {
  const { username, password } = req.body
  console.log(req.body)

  try {
    const id = UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    // No se debe mandar el error, (porque puede ser informacion
    // sensible que no deben ver los usuarios)
    res.status(400).send(error.message)
  }
})

app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
