import UsuarioRepository from "../../../../infra/repositories/usuario-repository";
import { errorNotFound, handleDatabaseError, successRequest } from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class GetByIdUsuariosController implements IController {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async handle(http: HttpRequest): Promise<HttpResponse> {
        try {
            const user = await this.usuarioRepository.findById(http.params.id);

            if(!user){
                return errorNotFound()
            }
      
            return successRequest(user)
          } catch (error) {
            console.log(error)
            return handleDatabaseError(error)
          }
    }
}