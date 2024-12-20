import { Application, Request, Response } from "express";
import usuarioRouter from "./usuarioRoutes";
import marcaRouter from "./marcaRoutes";
import categoriaRouter from "./categoriaRoutes";

const router = (app: Application) => {
  app.route("/").get((_req: Request, res: Response) => {
    res.send("Hello API - 19/12/2024");
  });

  app.use([
    usuarioRouter,
    marcaRouter,
    categoriaRouter
  ])
};

export default router;