import { Application, Request, Response } from "express";

const router = (app: Application) => {
  app.route("/").get((_req: Request, res: Response) => {
    res.send("Hello API - 19/12/2024");
  });
};

export default router;