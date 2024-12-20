import MarcaModel from "../../../../domain/model/marca.model";
import CategoriaRepository from "../../../../infra/repositories/categoria-repository";
import {
  errorBadRequest,
  handleDatabaseError,
  updated
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class UpdateCategoriaController implements IController {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categoryBody: MarcaModel = httpRequest.body;

      if (!categoryBody._id) {
        return errorBadRequest({ error: "ID inválido" });
      }

      const now = new Date();
      now.setHours(now.getHours() - 3);
      categoryBody.dataAtualizacao = now 

      const category = await this.categoriaRepository.update(
        categoryBody._id,
        httpRequest.body,
        ["usuario"]
      );

      return updated(category);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
