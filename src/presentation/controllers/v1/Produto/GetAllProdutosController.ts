import ProdutoRepository from "../../../../infra/repositories/produto-repository";
import {
  handleDatabaseError,
  successRequest,
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpResponse } from "../../../protocols/http";

export class GetAllProdutosController implements IController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async handle(): Promise<HttpResponse> {
    try {
      const product = await this.produtoRepository.find({}, [
        "usuario",
        "marca",
        "categoria",
      ]);

      return successRequest(product);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
