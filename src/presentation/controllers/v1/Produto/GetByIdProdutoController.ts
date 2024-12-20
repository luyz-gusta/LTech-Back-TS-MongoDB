import ProdutoRepository from "../../../../infra/repositories/produto-repository";
import {
  errorNotFound,
  handleDatabaseError,
  successRequest,
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class GetByIdProdutoController implements IController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async handle(http: HttpRequest): Promise<HttpResponse> {
    try {
      const product = await this.produtoRepository.findById(http.params.id, [
        "usuario",
        "marca",
        "categoria",
      ]);

      if (!product) {
        return errorNotFound();
      }

      return successRequest(product);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
