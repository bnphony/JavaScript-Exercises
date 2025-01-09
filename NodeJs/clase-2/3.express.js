const express = require('express')
const app = express()
app.disable('x-powered-by')


const jsonDitto = require('./pokemon/ditto.json')
const PORT = process.env.PORT ?? 3000


app.use(express.json())
// app.use((req, res, next) => {
//     if (req.method !== 'POST') return next()
//     if (req.headers['content-type']?.toLowerCase() !== 'application/json') return next()
//     console.log("paso el headers")
//     // Aqui solo llegan request que son POST y que tienen el header Content-Type: application/json
//     let body = ''
//     req.on('data', chunk => {
//         body += chunk.toString()
//     })
//     console.log("Logica del Middleware")
//     req.on('end', () => {
//         const data = JSON.parse(body)
//         data.timestamp = Date.now()
//         // Mutar la request y meter la informacion en el req.body
//         req.body = data
//         next()
//     })
// })

app.get('/', (req, res) => {
    // res.send('<h1>My pagina</h1>')
    res.json({hola: 'mundo'})
})

app.get('/pokemon/ditto', (req, res) => {
    res.json(jsonDitto)
})

app.post('/pokemon', (req, res) => {
    // req.body deberiamos guardar en la base de datos
    res.status(201).json(req.body)
  
})

app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

app.listen(PORT, () => {
    console.log(`server is listening in: http://localhost:${PORT}`)
})