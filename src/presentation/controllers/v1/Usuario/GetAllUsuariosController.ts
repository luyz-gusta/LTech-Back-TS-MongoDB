import UsuarioRepository from "../../../../infra/repositories/usuario-repository";
import { handleDatabaseError, successRequest } from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpResponse } from "../../../protocols/http";

export class GetAllUsuariosController implements IController {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async handle(): Promise<HttpResponse> {
        try {
            const users = await this.usuarioRepository.find({});
      
            return successRequest(users)
          } catch (error) {
            console.log(error)
            return handleDatabaseError(error)
          }
    }
}