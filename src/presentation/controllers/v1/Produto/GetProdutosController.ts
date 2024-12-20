import MarcaRepository from "../../../../infra/repositories/marca-repository";
import ProdutoRepository from "../../../../infra/repositories/produto-repository";
import {
  handleDatabaseError,
  successRequest,
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpResponse } from "../../../protocols/http";

export class GetProdutosController implements IController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async handle(): Promise<HttpResponse> {
    try {
      const products = await this.produtoRepository.find({ ativo: true }, [
        "usuario",
        "marca",
        "categoria",
      ]);

      return successRequest(products);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
