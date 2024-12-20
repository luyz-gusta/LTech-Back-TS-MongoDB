import { ObjectId } from "mongoose";

export default interface MarcaModel {
  _id: ObjectId;
  nome: string;
  usuario: ObjectId;
  ativo?: boolean;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}
