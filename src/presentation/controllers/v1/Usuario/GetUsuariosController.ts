import UsuarioRepository from "../../../../infra/repositories/usuario-repository";
import { handleDatabaseError, successRequest } from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpResponse } from "../../../protocols/http";

export class GetUsuariosController implements IController {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async handle(): Promise<HttpResponse> {
        try {
            const users = await this.usuarioRepository.find({ativo: true});
      
            return successRequest(users)
          } catch (error) {
            console.log(error)
            return handleDatabaseError(error)
          }
    }
}