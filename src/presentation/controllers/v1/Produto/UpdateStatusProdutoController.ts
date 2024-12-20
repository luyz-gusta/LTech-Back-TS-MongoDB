import MarcaRepository from "../../../../infra/repositories/marca-repository";
import ProdutoRepository from "../../../../infra/repositories/produto-repository";
import {
  errorBadRequest,
  errorNotFound,
  handleDatabaseError,
  updated,
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class UpdateStatusProdutoController implements IController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const status = httpRequest.params.status;
      const id = httpRequest.params.id;

      if (!id) {
        return errorBadRequest({ error: "ID inválido" });
      }

      let product;

      if (status == "desativar") {
        product = await this.produtoRepository.disable(id);
      } else {
        product = await this.produtoRepository.enable(id);
      }

      if (!product) {
        return errorNotFound();
      }

      const now = new Date();
      now.setHours(now.getHours() - 3);
      product.dataAtualizacao = now;
      await this.produtoRepository.update(id, product);

      return updated(product);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
