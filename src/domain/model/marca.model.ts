import { ObjectId } from "mongoose";
import UsuarioModel from "./usuario.model";

export default interface MarcaModel {
  _id: ObjectId;
  nome: string;
  usuario: UsuarioModel;
  ativo?: boolean;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}
