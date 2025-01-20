import ProdutoRepository from "../../../../infra/repositories/produto-repository";
import {
    deleted,
    errorBadRequest,
    handleDatabaseError
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class DeleteProdutoController implements IController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id;

      if (!id) {
        return errorBadRequest({ error: "ID inválido" });
      }

      await this.produtoRepository.delete(id);

      return deleted();
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
