import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import ProdutoRepository from "../../infra/repositories/produto-repository";
import produtoSchema from "../../infra/schemas/produtoSchema";
import { CreateProdutoController } from "../../presentation/controllers/v1/Produto/CreateProdutoController";
import handleYupValidationError from "../../presentation/middlewares/validationError";
import { adaptRoute } from "../adapters/express.adapter";
import { GetAllProdutosController } from "../../presentation/controllers/v1/Produto/GetAllProdutosController";
import { GetByIdProdutoController } from "../../presentation/controllers/v1/Produto/GetByIdProdutoController";
import { GetProdutosController } from "../../presentation/controllers/v1/Produto/GetProdutosController";
import { UpdateProdutoController } from "../../presentation/controllers/v1/Produto/UpdateProdutoController";
import { UpdateStatusProdutoController } from "../../presentation/controllers/v1/Produto/UpdateStatusProdutoController";
import { DeleteProdutoController } from "../../presentation/controllers/v1/Produto/DeleteProdutoController";

const produtoRouter = Router();
const produtoRepository = new ProdutoRepository();

const validateBody: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => handleYupValidationError(produtoSchema, req, res, next);

produtoRouter.post(
  "/produtos",
  validateBody,
  adaptRoute(new CreateProdutoController(produtoRepository))
);

produtoRouter.put(
  "/produtos",
  validateBody,
  adaptRoute(new UpdateProdutoController(produtoRepository))
);

produtoRouter.put(
  "/produtos/:id/:status",
  adaptRoute(new UpdateStatusProdutoController(produtoRepository))
);

produtoRouter.get(
  "/produtos/all",
  adaptRoute(new GetAllProdutosController(produtoRepository))
);

produtoRouter.get(
  "/produtos/:id",
  adaptRoute(new GetByIdProdutoController(produtoRepository))
);

produtoRouter.get(
  "/produtos",
  adaptRoute(new GetProdutosController(produtoRepository))
);

produtoRouter.delete(
  "/produtos/:id",
  adaptRoute(new DeleteProdutoController(produtoRepository))
);



export default produtoRouter;
