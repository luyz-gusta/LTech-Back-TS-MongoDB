import CategoriaRepository from "../../../../infra/repositories/categoria-repository";
import { created, handleDatabaseError } from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class CreateCategoriaController implements IController {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try { 
      const category = await this.categoriaRepository.create(httpRequest.body, ['usuario']);

      return created(category);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
