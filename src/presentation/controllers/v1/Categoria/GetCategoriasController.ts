import CategoriaRepository from "../../../../infra/repositories/categoria-repository";
import { handleDatabaseError, successRequest } from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpResponse } from "../../../protocols/http";

export class GetCategoriasController implements IController {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

    async handle(): Promise<HttpResponse> {
        try {
            const categories = await this.categoriaRepository.find({ativo: true}, ['usuario']);
      
            return successRequest(categories)
          } catch (error) {
            console.log(error)
            return handleDatabaseError(error)
          }
    }
}