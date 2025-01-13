// Gracias a esto podemos tener varios servidores que utilizan
// diferentes bases de datos

import { createApp } from './app.js'
import { MovieModel } from './models/mysql/movie.js'

createApp({ movieModel: MovieModel })