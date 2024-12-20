import { ObjectId } from "mongoose";

export default interface ProdutoModel {
  _id: ObjectId;
  nome: string;
  descricao: string;
  preco: number;
  fotos: Array<string>;
  ativo?: boolean;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
  marca: ObjectId;
  categoria: ObjectId;
  usuario: ObjectId;
}
