import MarcaRepository from "../../../../infra/repositories/marca-repository";
import {
    deleted,
    errorBadRequest,
    handleDatabaseError,
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class DeleteMarcaController implements IController {
  constructor(private readonly marcaRepository: MarcaRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id;

      if (!id) {
        return errorBadRequest({ error: "ID inválido" });
      }

      await this.marcaRepository.delete(id);

      return deleted();
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
