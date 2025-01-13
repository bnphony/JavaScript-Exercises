import express from 'express';
import logger from 'morgan'

import mysql from 'mysql2/promise'

import dotenv from 'dotenv'

// Socket io
import { Server } from 'socket.io'
import { createServer } from 'node:http'

dotenv.config()

const PORT = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    // Crear un recuperador de conexion, 
    // Cuando un usuario perdio la conexion,
    // El servidor vuelve a reconextar al usuario, cuando
    // el usuario recupere la conexion
    connectionStateRecovery: {}
})

const config = {
    host: 'localhost',
    user: 'bryan',
    port: 3308,
    password: '',
    database: 'chat1'
}

const db = await mysql.createConnection(config)


// Crear la base de datos
// const db = createClient({
//     url: "link_de_la_base_de_datos",
//     // Aqui esta leyendo la variable de entorno del archivo .env
//     authToken: process.env.DB_TOKEN,
// })

await db.execute(`
    CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY AUTO_INCREMENT, 
        content TEXT,
        user TEXT
    )    
`)



io.on('connection',  async (socket) => {
    console.log('a user has connected!')

    socket.on('disconnect', () => {
        console.log('an user has disconnected')
    })

    // Recibir el evento del mensaje enviado por el usuario
    socket.on('chat message', async (msg) => {
        let result
        try {
            const user = socket.handshake.auth.username ?? 'anonymus';

            [result] = await db.execute(
                `INSERT INTO messages (content, user) VALUES (?, ?)`,
                [msg, user]
            )
            // Actualiza la posicion del ultimo mensaje para todos los usuarios conectados
            io.emit('chat message', msg, result.insertId, user)

        } catch (e) {
            console.error(e)
            return
        }
    })

    console.log('auth ⬇')
    console.log(socket.handshake.auth)

    // Se ejecuta cuando el usuario inicia conexion
    // Recuperar todos los mensajes
    if (!socket.recovered) {
        try {
            // Conseguir los ultimos mensajes, de acuerdo al ultimo mensaje
            const [ results ] = await db.execute(
                'SELECT id, content, user FROM messages WHERE id > ?',
                [ socket.handshake.auth.serverOffset ?? 0 ]
            )
            // Actualizar la posicion del ultimo mensaje para el usuario que envio la peticion
            results.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString(), row.user)
            })
        } catch (e) {
            console.error(e)
        }
    }
})

app.use(logger('dev'))


app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})


server.listen(PORT, () => {
    console.log(`Server ruuning on http://localhost:${PORT}`)
})