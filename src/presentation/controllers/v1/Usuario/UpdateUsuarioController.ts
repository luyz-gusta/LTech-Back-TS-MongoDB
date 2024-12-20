import UsuarioModel from "../../../../domain/model/usuario.model";
import UsuarioRepository from "../../../../infra/repositories/usuario-repository";
import {
    errorBadRequest,
    handleDatabaseError,
    updated
} from "../../../helpers/http-helpers";
import { keyHash } from "../../../helpers/validation-password";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class UpdateUsuarioController implements IController {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userBody: UsuarioModel = httpRequest.body;
      const hashedPassword = keyHash(userBody.senha);
      userBody.senha = hashedPassword;

      if (!userBody._id) {
        return errorBadRequest({ error: "ID inválido" });
      }

      const now = new Date();
      now.setHours(now.getHours() - 3);
      userBody.dataAtualizacao = now 

      const users = await this.usuarioRepository.update(userBody._id, userBody);

      return updated(users);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
