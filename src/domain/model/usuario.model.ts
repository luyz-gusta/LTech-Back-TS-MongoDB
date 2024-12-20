import { ObjectId } from "mongoose";
import { TipoUsuario } from "../../infra/types/tipoUsuario";

export default interface UsuarioModel {
  _id: ObjectId;
  nome: string;
  usuario: string;
  email: string;
  senha: string;
  ativo?: boolean;
  ultimoLogin?: Date | null;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
  tipoUsuario: TipoUsuario;
  fotoPerfil: string;
}
