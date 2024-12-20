import UsuarioModel from "../../../../domain/model/usuario.model";
import UsuarioRepository from "../../../../infra/repositories/usuario-repository";
import {
  errorBadRequest,
  errorNotFound,
  handleDatabaseError,
  statusUpdated,
  updated,
} from "../../../helpers/http-helpers";
import { keyHash } from "../../../helpers/validation-password";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class UpdateStatusUsuarioController implements IController {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const status = httpRequest.params.status;
      const id = httpRequest.params.id;

      if (!id) {
        return errorBadRequest({ error: "ID inválido" });
      }

      let user;

      if (status == "desativar") {
        user = await this.usuarioRepository.disable(id);
      } else {
        user = await this.usuarioRepository.enable(id);
      }

      if(!user){
        return errorNotFound()
      }

      const now = new Date();
      now.setHours(now.getHours() - 3);
      user.dataAtualizacao = now 
      await this.usuarioRepository.update(id, user);

      return updated(user);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
