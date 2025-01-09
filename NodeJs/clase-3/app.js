const express = require('express')
// Crear un Universal Unique Identifier
const crypto = require('node:crypto')
const movies = require('./movies.json')
const cors = require('cors')

const { validateMovie, validatePartialMovie } = require('./schemas/movies-schema')
const app = express()

// Capturar el body de la peticion
app.use(express.json())
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://127.0.0.1:5500',
            'http://localhost:3000',
        ]

        // Permitir solo la lista de dominios
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }

        // Cuando se llama desde el mismo dominio
        // El navegador no te da el origin cuando se llama desde el 
        // mismo origen
        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}))
app.disable('x-powered-by') // Desactivar mostrar que se esta utilizando Express en el navegador(aumentar la seguridad)

app.get('/', (req, res) => {
    res.send('<h1>Exito y fracaso son dos caras de la misma moneda</h1>')
})

// Dominios que tienen acceso a este END-POINT


// Todos los recursos que sean MOVIES se identifican con /movies
// Si encuentra el parametro genre, filtra por genero
app.get('/movies', (req, res) => {
    // const origin = req.header('origin')
    // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin)
    // }
    const { genre } = req.query

    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
})

// Esto no es REST, porque estamos guardando
// el estado de la aplicacion en memoria
app.post('/movies', (req, res) => {
    // Crear una estructura que debe seguir una pelicula
    console.log("ENTRO al post")
    const result = validateMovie(req.body)
    console.log("paso la validacion")
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }    
    

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie)
    console.log("Se creo el recurso")
    res.status(201).json(newMovie) // actualizar la cache del cliente
})


app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)
    
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return res.status(404).json({ message: "Movie not found"})

    // Reemplazar los datos antiguos con los datos nuevos
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
    
})


// !DELETE
app.delete('/movies/:id', (req, res) => {
    // const origin = req.header('origin')
    // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin)
    // }
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    movies.splice(movieIndex, 1)

    return res.json({ message: 'Movie deleted' })
})

// !Importate
// * Esto es el CORS Pre-flight que se llama automaticamente cuando 
// * se quiere realizar metodos COMPLEJOS (PUT, PATCH, DELETE)
// app.options('/movies/:id', (req, res) => {
//     const origin = req.header('origin')

//     if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//         res.header('Access-Control-Allow-Origin', origin)
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//     }
//     res.send(200)
// })


const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`server is listening in: http://localhost:${PORT}`)
})