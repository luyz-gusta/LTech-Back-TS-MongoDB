import MarcaRepository from "../../../../infra/repositories/marca-repository";
import { handleDatabaseError, successRequest } from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpResponse } from "../../../protocols/http";

export class GetAllMarcasController implements IController {
    constructor(private readonly marcaRepository: MarcaRepository) {}

    async handle(): Promise<HttpResponse> {
        try {
            const brands = await this.marcaRepository.find({}, ['usuario']);
      
            return successRequest(brands)
          } catch (error) {
            console.log(error)
            return handleDatabaseError(error)
          }
    }
}