const express = require('express')
const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

app.get('/', (req, res) => {
    // res.send('<h1>My pagina</h1>')
    res.json({hola: 'mundo'})
})

app.post('/pokemon', (req, res) => {
    let body = ''
    req.on('data', chunk => {
        body += chunk
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        res.status(201).json(data)
    })
})

app.listen(PORT, () => {
    console.log(`server is listening in: http://localhost:${PORT}`)
})