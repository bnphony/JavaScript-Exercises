import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { createMovieRouter } from "./routes/movies.js";

export const createApp = ({ movieModel }) => {
  const app = express();
  // Obtener el cuerpo de la peticion
  app.use(json());

  // Controlar los dominios que tiene acceso
  app.use(corsMiddleware());
  // No mostrar la tecnologia utilizada
  app.disable("x-powered-by");

  app.get("/", (req, res) => {
    res.send(
      "<h1>Si piensas que puedes o piensas que no puedes, tienes razón.</h1>"
    );
  });

  // Toda la logica de los end-points esta en el moviesRouter
  // TODO: Desdel punto de entrada decidimos que MODELO (base de datos) utilizar
  app.use("/movies", createMovieRouter({ movieModel }));
  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`server is listening in http://localhost:${PORT}`);
  });
};
