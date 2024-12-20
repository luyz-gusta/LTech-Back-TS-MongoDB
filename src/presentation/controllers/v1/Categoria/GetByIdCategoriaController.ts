import CategoriaRepository from "../../../../infra/repositories/categoria-repository";
import MarcaRepository from "../../../../infra/repositories/marca-repository";
import UsuarioRepository from "../../../../infra/repositories/usuario-repository";
import {
  errorNotFound,
  handleDatabaseError,
  successRequest,
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class GetByIdCategoriaController implements IController {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async handle(http: HttpRequest): Promise<HttpResponse> {
    try {
      const category = await this.categoriaRepository.findById(http.params.id, [
        "usuario",
      ]);

      if (!category) {
        return errorNotFound();
      }

      return successRequest(category);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
