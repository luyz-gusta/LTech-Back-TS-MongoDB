import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import handleYupValidationError from "../../presentation/middlewares/validationError";
import marcaSchema from "../../infra/schemas/marcaSchema";
import { adaptRoute } from "../adapters/express.adapter";
import CategoriaRepository from "../../infra/repositories/categoria-repository";
import { GetAllCategoriasController } from "../../presentation/controllers/v1/Categoria/GetAllCategoriasController";
import { GetCategoriasController } from "../../presentation/controllers/v1/Categoria/GetCategoriasController";
import { GetByIdCategoriaController } from "../../presentation/controllers/v1/Categoria/GetByIdCategoriaController";
import { CreateCategoriaController } from "../../presentation/controllers/v1/Categoria/CreateCategoriaController";
import { UpdateCategoriaController } from "../../presentation/controllers/v1/Categoria/UpdateCategoriasController";
import { UpdateStatusCategoriaController } from "../../presentation/controllers/v1/Categoria/UpdateStatusCategoriasController";

const categoriaRouter = Router();
const categoriaRepository = new CategoriaRepository();

const validateBody: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => handleYupValidationError(marcaSchema, req, res, next);

categoriaRouter.get(
  "/categorias/all",
  adaptRoute(new GetAllCategoriasController(categoriaRepository))
);
categoriaRouter.get(
  "/categorias",
  adaptRoute(new GetCategoriasController(categoriaRepository))
);
categoriaRouter.get(
  "/categorias/:id",
  adaptRoute(new GetByIdCategoriaController(categoriaRepository))
);
categoriaRouter.post(
  "/categorias",
  validateBody,
  adaptRoute(new CreateCategoriaController(categoriaRepository))
);
categoriaRouter.put(
  "/categorias",
  validateBody,
  adaptRoute(new UpdateCategoriaController(categoriaRepository))
);
categoriaRouter.put(
  "/categorias/:id/:status",
  adaptRoute(new UpdateStatusCategoriaController(categoriaRepository))
);

export default categoriaRouter;