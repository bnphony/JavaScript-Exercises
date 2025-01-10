import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'bryan',
    port: 3308,
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)


export class MovieModel {
    static async getAll ({ genre }) {
        
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()
            const  [genres] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
            )

            // Si no se encontro generos
            if (genres.length === 0) return []

            // Obtener el ID del primer resultado de generos encontrados
            const [{ id }] = genres

            const [filteredMovies] = await connection.query(
                `select m.title, m.year, BIN_TO_UUID(m.id) id, g.name as 'genre' from movie m
                inner join movie_genres mg on mg.movie_id = m.id
                inner join genre g on mg.genre_id = g.id
                where mg.genre_id = ?;`, [ id ]
            )

            return filteredMovies;
        }

        const [movies]= await connection.query(
            'select title, year, director, duration, rate, poster, BIN_TO_UUID(id) id from movie;'
        )


        return movies
    }

    static async getById({ id }) {
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate 
            FROM movie WHERE id = UUID_TO_BIN(?);`,
            [ id ]
        )

        if (movies.length === 0) return null

        return movies[0]
    }


    static async create({ input }) {
        const {
            genre,
            title,
            year, 
            duration,
            director,
            rate, 
            poster
        } = input

        
        const [ uuidResult ] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        // TODO: Aqui se coloca 'uuid' directamente en el query, 
        // TODO: por que 'uuid' es creado por el backend
        try {
            await connection.query(
                `INSERT INTO movie(id, title, year, director, duration, poster, rate) 
                 VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
                 [title, year, director, duration, poster, rate]
            )
            // Crear los generos
            const queryGenre = genre.map(g => `LOWER('${g}')`).join(', ')            
            
            const [genres] = await connection.query(
                `SELECT id, name from genre 
                WHERE LOWER(name) in (${queryGenre});`
            )
            for (const item of genres){
                await connection.query(
                    `INSERT INTO movie_genres(movie_id, genre_id) 
                     VALUES (UUID_TO_BIN(?), ?);`, [ uuid, item.id ]
                )
            }
        } catch (e) {
            // NO debes enviar informacion sensible al usuario
            throw new Error('Error creating a movie')
            // Lo recomendado es enviar la traza a un servicio interno
            // sendLog(e)
        }

        // Recuperar la pelicula que se acaba de CREAR
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
             FROM movie WHERE id = UUID_TO_BIN(?);`,
             [ uuid ]
        )

        return movies[0]
    }

    static async delete ({ id }) {
        try {
            await connection.query(
                `DELETE FROM movie 
                 WHERE id = UUID_TO_BIN(?);`, [ id ]
            )
            return true
        } catch (e) {
            throw new Error('Error deleting a movie')
        }
        
    }

    static async update ({ id, input }) {
        const [moviesID] = await connection.query(
            `SELECT id FROM movie 
             WHERE id = UUID_TO_BIN(?);`, [ id ]
        )
        if (moviesID.length === 0) return false

        const allowedFields = ['title', 'year', 'duration', 'director', 'rate', 'poster']
        const updates = []
        const values = []

        // Construir el query dinamicamente
        for (const [key, value] of Object.entries(input)) {
            if (allowedFields.includes(key)) {
                updates.push(`${key} = ?`)
                values.push(value)
            }
        }
        // Si no se envio ningun campo valido
        if (updates.length === 0) return false;

        // Agregar el ID del registro
        values.push(id);

        try {
            await connection.query(
                `UPDATE movie SET ${updates.join(', ')} 
                 WHERE id = UUID_TO_BIN(?)`,
                 values
            )
            const [movies] = await connection.query(
                `SELECT title, year, director, duration, rate, poster, BIN_TO_UUID(id) id FROM movie 
                 WHERE id = UUID_TO_BIN(?);`, [ id ]
            )          

            return movies[0]
            

        } catch (e) {
            throw new Error("Error updating a movie")
        }
    }
}