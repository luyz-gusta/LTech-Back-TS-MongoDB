import MarcaModel from "../../../../domain/model/marca.model";
import MarcaRepository from "../../../../infra/repositories/marca-repository";
import {
  errorBadRequest,
  handleDatabaseError,
  updated
} from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class UpdateMarcaController implements IController {
  constructor(private readonly marcaRepository: MarcaRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const maskBody: MarcaModel = httpRequest.body;

      if (!maskBody._id) {
        return errorBadRequest({ error: "ID inválido" });
      }

      const now = new Date();
      now.setHours(now.getHours() - 3);
      maskBody.dataAtualizacao = now 

      const mark = await this.marcaRepository.update(
        maskBody._id,
        httpRequest.body,
        ["usuario"]
      );

      return updated(mark);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
