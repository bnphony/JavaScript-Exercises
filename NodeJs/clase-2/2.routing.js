const http = require('node:http')

const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
    const {method, url} = req

    switch(method) {
        case 'GET': 
            switch(url) {
                case '/pokemon/ditto': 
                    res.setHeader('content-type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(dittoJSON))
                default:
                    res.statusCode = 404
                    res.setHeader('content-type', 'text/html; charset=utf-8 ')
                    return res.end('<h1>404</h1>')                    
            }
        case 'POST':
            switch(url) {
                case '/pokemon': {
                    let body = ''
                    // Aqui va recibiendo los datos, en partes
                    req.on('data', chunk => {
                        body += chunk.toString()
                    })
                    // Esto se ejecuta cuando ya llegaron todos los datos
                    req.on('end', () => {
                        const data = JSON.parse(body)
                        // Llamar a una base de datos para guardar la informacion
                        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
                        data.timestamp = Date.now()
                        res.end(JSON.stringify(data))
                    })
                    break
                }
                default: {
                    res.statusCode = 404
                    res.setHeader('content-type', 'text/html; charset=utf-8')
                    return res.end('<h1></h1>')
                }

            }
    }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
    console.log(`server is listening in port: http://localhost:${3000}`)
})