import ProdutoRepository from "../../../../infra/repositories/produto-repository";
import { created, handleDatabaseError } from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class CreateProdutoController implements IController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try { 
      const product = await this.produtoRepository.create(httpRequest.body, ['usuario', 'marca', 'categoria']);

      return created(product);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
