import {
    NextFunction,
    Request,
    RequestHandler,
    Response,
    Router,
} from "express";
import { CreateUsuarioController } from "../../presentation/controllers/v1/Usuario/CreateUsuarioController";
import { GetAllUsuariosController } from "../../presentation/controllers/v1/Usuario/GetAllUsuariosController";
import { GetByIdUsuariosController } from "../../presentation/controllers/v1/Usuario/GetByIDUsuarioController";
import { GetUsuariosController } from "../../presentation/controllers/v1/Usuario/GetUsuariosController";
import { LoginUsuarioController } from "../../presentation/controllers/v1/Usuario/LoginUsuarioController";
import { UpdateStatusUsuarioController } from "../../presentation/controllers/v1/Usuario/UpdateStatusUsuarioController";
import { UpdateUsuarioController } from "../../presentation/controllers/v1/Usuario/UpdateUsuarioController";
import { adaptRoute } from "../adapters/express.adapter";
import usuarioSchema, { loginSchema } from "../../infra/schemas/usuarioSchema";
import UsuarioRepository from "../../infra/repositories/usuario-repository";
import handleYupValidationError from "../../presentation/middlewares/validationError";

const usuarioRouter = Router();
const usuarioRepository = new UsuarioRepository();

const validateBody: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => handleYupValidationError(usuarioSchema, req, res, next);

const validateLogin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => handleYupValidationError(loginSchema, req, res, next);

usuarioRouter.post(
  "/login",
  validateLogin,
  adaptRoute(new LoginUsuarioController(usuarioRepository))
);
usuarioRouter.post(
  "/registro",
  validateBody,
  adaptRoute(new CreateUsuarioController(usuarioRepository))
);
usuarioRouter.get(
  "/usuarios/all",
  adaptRoute(new GetAllUsuariosController(usuarioRepository))
);
usuarioRouter.get(
  "/usuarios",
  adaptRoute(new GetUsuariosController(usuarioRepository))
);
usuarioRouter.get(
  "/usuarios/:id",
  adaptRoute(new GetByIdUsuariosController(usuarioRepository))
);
usuarioRouter.put(
  "/usuarios",
  validateBody,
  adaptRoute(new UpdateUsuarioController(usuarioRepository))
);
usuarioRouter.put(
  "/usuarios/:id/:status",
  adaptRoute(new UpdateStatusUsuarioController(usuarioRepository))
);

export default usuarioRouter;
