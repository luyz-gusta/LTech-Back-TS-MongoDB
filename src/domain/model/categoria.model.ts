import { ObjectId } from "mongoose";

export default interface CategoriaModel {
  _id: ObjectId;
  nome: string;
  usuario: ObjectId;
  ativo?: boolean;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}
