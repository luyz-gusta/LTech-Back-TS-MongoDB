import MarcaRepository from "../../../../infra/repositories/marca-repository";
import { created, handleDatabaseError } from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class CreateMarcaController implements IController {
  constructor(private readonly marcaRepository: MarcaRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try { 
      const mark = await this.marcaRepository.create(httpRequest.body, ['usuario']);

      return created(mark);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
