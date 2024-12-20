import MarcaRepository from "../../../../infra/repositories/marca-repository";
import UsuarioRepository from "../../../../infra/repositories/usuario-repository";
import {
  errorNotFound,
  handleDatabaseError,
  successRequest,
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class GetByIdMarcasController implements IController {
  constructor(private readonly marcaRepository: MarcaRepository) {}

  async handle(http: HttpRequest): Promise<HttpResponse> {
    try {
      const mark = await this.marcaRepository.findById(http.params.id, [
        "usuario",
      ]);

      if (!mark) {
        return errorNotFound();
      }

      return successRequest(mark);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
