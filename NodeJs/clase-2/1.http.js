const http = require('node:http');
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000


const processRequest = (req, res) => {
    res.setHeader('content-type', 'text/html; charset=utf-8')
    if (req.url === '/') {
        res.statusCode = 200
        res.end('Bienvenido a mi página web')
    

    } else if (req.url === '/imagen-bonita.png'){
        fs.readFile('./umiri.png', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>500 Internal Server Error</h1>')
            } else {
                // Aqui le convierte data(buffer de datos temporales) -> en imagen
                res.setHeader('content-type', 'image/png')
                res.statusCode = 200
                res.end(data)
            }
        })
    }else if (req.url === '/contacto') {
        res.statusCode = 200
        res.end('<h2>Pagina de contacto</h2>')
    } else {
        res.statusCode = 404
        res.end('<h3>Not Found!</h3>')
    }
}
const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`server listening in port http://localhost:${desiredPort}`)
})