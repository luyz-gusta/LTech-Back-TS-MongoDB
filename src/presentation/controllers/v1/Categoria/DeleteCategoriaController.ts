import CategoriaRepository from "../../../../infra/repositories/categoria-repository";
import {
    deleted,
    errorBadRequest,
    handleDatabaseError
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class DeleteCategoriaController implements IController {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async handle(http: HttpRequest): Promise<HttpResponse> {
    try {
      const id = http.params.id;

      if (!id) {
        return errorBadRequest({ error: "ID inválido" });
      }

      await this.categoriaRepository.delete(id);

      return deleted();
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
