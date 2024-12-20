import MarcaModel from "../../../../domain/model/marca.model";
import ProdutoRepository from "../../../../infra/repositories/produto-repository";
import {
  errorBadRequest,
  handleDatabaseError,
  updated,
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class UpdateProdutoController implements IController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const productBody: MarcaModel = httpRequest.body;

      if (!productBody._id) {
        return errorBadRequest({ error: "ID inválido" });
      }

      const now = new Date();
      now.setHours(now.getHours() - 3);
      productBody.dataAtualizacao = now;

      const product = await this.produtoRepository.update(
        productBody._id,
        httpRequest.body,
        ["usuario", "marca", "categoria"]
      );

      return updated(product);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
