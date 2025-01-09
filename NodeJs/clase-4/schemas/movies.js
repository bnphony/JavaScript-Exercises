import z from 'zod'

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required. Please, check the URL'
    }),
    year: z.number().int().min(1900).max(2025),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Action', 'Crime', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 
            'Horror', 'Thriller', 'Sci-Fi'
        ]),
        {
            required_error: 'Movie genre is required.',
            invalid_type_error: 'Movie genre must be an array of enum Genre'
        }
    )
})

// Aqui debe cumplir todas las validaciones(todos los campos)
export function validateMovie(input) {
    return movieSchema.safeParse(input)
}

// Aqui debe cumplir solo las validaciones de los campos que envie el usuario
export function validatePartialMovie(input) {
    return movieSchema.partial().safeParse(input)
}
