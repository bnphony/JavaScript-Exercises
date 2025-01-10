import express, { json } from 'express'
const app = express()
import { corsMiddleware } from './middlewares/cors.js'
import { moviesRouter } from './routes/movies.js'

// * Forma 1 de importar un JSON en ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// TODO: RECOMENDADA
// * Forma 2 de improtar un JSON en ESModules
// import { createRequire } from 'node:module'
// const require = createRequire(import.meta.url)
// export const readJSON = (path) => require(path)



//! ESTO solo funciona en commonJS
// Cargar todas las peliculas
// import movies from './movies.json'

// Obtener el cuerpo de la peticion
app.use(json())

// Controlar los dominios que tiene acceso
app.use(corsMiddleware())
// No mostrar la tecnologia utilizada
app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.send('<h1>Si piensas que puedes o piensas que no puedes, tienes razón.</h1>')
})


// Toda la logica de los end-points esta en el moviesRouter
app.use('/movies', moviesRouter)
const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
    console.log(`server is listening in http://localhost:${PORT}`)
})