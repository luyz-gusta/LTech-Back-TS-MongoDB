import MarcaRepository from "../../../../infra/repositories/marca-repository";
import {
  errorBadRequest,
  handleDatabaseError,
  updated
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class UpdateStatusMarcaController implements IController {
  constructor(private readonly marcaRepository: MarcaRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const status = httpRequest.params.status;
      const id = httpRequest.params.id;

      if (!id) {
        return errorBadRequest({ error: "ID inválido" });
      }

      let mask;

      if (status == "desativar") {
        mask = await this.marcaRepository.disable(id);
      } else {
        mask = await this.marcaRepository.enable(id);
      }

      const now = new Date();
      now.setHours(now.getHours() - 3);
      mask.dataAtualizacao = now 
      await this.marcaRepository.update(id, mask);

      return updated(mask);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
