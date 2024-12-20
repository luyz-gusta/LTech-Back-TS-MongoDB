import Usuario, { IUsuarioDocument } from "../../domain/entities/usuario";
import UsuarioModel from "../../domain/model/usuario.model";
import { BaseRepository } from "./base-repository";

export default class UsuarioRepository extends BaseRepository<
  UsuarioModel,
  IUsuarioDocument
> {
  constructor() {
    super(Usuario);
  }
}
