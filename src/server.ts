import { config } from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./main/routes";

const main = async () => {
  config();
  const port = process.env.PORT || 8000;
  const app: Application = express();

  const corsOptions = {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "X-Kuma-Revision"],
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json());

  await mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUESTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=ClusterGlobal`
    )
    .then(() => {
      router(app);
      app.listen(port, () =>
        console.log(
          `Server listening on port ${port}: https://ltech-back-ts-mongodb.onrender.com`
        )
      );
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

main();
