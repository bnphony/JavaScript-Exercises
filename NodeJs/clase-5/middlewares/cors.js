import cors from 'cors'

const ALLOWED_ORIGIN = [
    'http://127.0.0.1:5500'
]

export const corsMiddleware = ({ acceptedOrigins = ALLOWED_ORIGIN } = {}) => cors({
    origin: (origin, callback) => {
        

        if (acceptedOrigins.includes(origin) || !origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))

    }
})
