import UsuarioModel from "../../../../domain/model/usuario.model";
import UsuarioRepository from "../../../../infra/repositories/usuario-repository";
import { created, handleDatabaseError } from "../../../helpers/http-helpers";
import { keyHash } from "../../../helpers/validation-password";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class CreateUsuarioController implements IController {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userBody: UsuarioModel = httpRequest.body;
      const hashedPassword = keyHash(userBody.senha);
      userBody.senha = hashedPassword;
      const users = await this.usuarioRepository.create(userBody);

      return created(users);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
