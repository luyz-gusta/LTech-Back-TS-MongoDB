import CategoriaRepository from "../../../../infra/repositories/categoria-repository";
import {
  errorBadRequest,
  errorNotFound,
  handleDatabaseError,
  updated
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class UpdateStatusCategoriaController implements IController {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const status = httpRequest.params.status;
      const id = httpRequest.params.id;

      if (!id) {
        return errorBadRequest({ error: "ID inválido" });
      }

      let category;

      if (status == "desativar") {
        category = await this.categoriaRepository.disable(id);
      } else {
        category = await this.categoriaRepository.enable(id);
      }

      if(!category){
        return errorNotFound()
      }

      const now = new Date();
      now.setHours(now.getHours() - 3);
      category.dataAtualizacao = now 
      await this.categoriaRepository.update(id, category);

      return updated(category);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
