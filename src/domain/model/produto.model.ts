import { ObjectId } from "mongoose";
import { EstadoProduto } from "../../infra/types/types-global";

export default interface ProdutoModel {
  _id: ObjectId;
  nome: string;
  descricao: string;
  preco: number;
  fotos: Array<string>;
  ativo?: boolean;
  emEstoque?: boolean;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
  marca: ObjectId;
  categoria: ObjectId;
  usuario: ObjectId;
  estadoProduto: EstadoProduto,
  destaque?: boolean
}
