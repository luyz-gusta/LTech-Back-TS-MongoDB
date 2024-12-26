import UsuarioRepository from "../../../../infra/repositories/usuario-repository";
import { handleDatabaseError, invalidAccess, invalidLogin, invalidUser, successRequest } from "../../../helpers/http-helpers";
import { comparePasswords } from "../../../helpers/validation-password";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class LoginUsuarioController implements IController {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { usuario, senha } = httpRequest.body;
      
      const user = await this.usuarioRepository.findOne({
        usuario
      });

      if(!user){
        return invalidUser()
      }else if(!comparePasswords(user.senha, senha)){
        return invalidLogin()
      }else if(!user.ativo){
        return invalidAccess('Usuário')
      }

      const now = new Date();
      now.setHours(now.getHours() - 3);
      user.ultimoLogin = now 
      await this.usuarioRepository.update(user._id, user)

      return successRequest(user);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
