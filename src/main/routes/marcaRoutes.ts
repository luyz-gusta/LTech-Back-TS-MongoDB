import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import MarcaRepository from "../../infra/repositories/marca-repository";
import handleYupValidationError from "../../presentation/middlewares/validationError";
import marcaSchema from "../../infra/schemas/marcaSchema";
import { adaptRoute } from "../adapters/express.adapter";
import { GetAllMarcasController } from "../../presentation/controllers/v1/Marca/GetAllMarcasController";
import { CreateMarcaController } from "../../presentation/controllers/v1/Marca/CreateMarcaController";
import { GetMarcasController } from "../../presentation/controllers/v1/Marca/GetMarcasController";
import { UpdateMarcaController } from "../../presentation/controllers/v1/Marca/UpdateMarcaController";
import { UpdateStatusMarcaController } from "../../presentation/controllers/v1/Marca/UpdateStatusMarcaController";
import { GetByIdMarcasController } from "../../presentation/controllers/v1/Marca/GetByIdMarcasController";
import { DeleteMarcaController } from "../../presentation/controllers/v1/Marca/DeleteMarcaController";

const marcaRouter = Router();
const marcaRepository = new MarcaRepository();

const validateBody: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => handleYupValidationError(marcaSchema, req, res, next);

marcaRouter.get(
  "/marcas/all",
  adaptRoute(new GetAllMarcasController(marcaRepository))
);
marcaRouter.get(
  "/marcas",
  adaptRoute(new GetMarcasController(marcaRepository))
);
marcaRouter.get(
  "/marcas/:id",
  adaptRoute(new GetByIdMarcasController(marcaRepository))
);
marcaRouter.post(
  "/marcas",
  validateBody,
  adaptRoute(new CreateMarcaController(marcaRepository))
);
marcaRouter.put(
  "/marcas",
  validateBody,
  adaptRoute(new UpdateMarcaController(marcaRepository))
);
marcaRouter.put(
  "/marcas/:id/:status",
  adaptRoute(new UpdateStatusMarcaController(marcaRepository))
);
marcaRouter.delete(
  "/marcas/:id",
  adaptRoute(new DeleteMarcaController(marcaRepository))
);

export default marcaRouter;
