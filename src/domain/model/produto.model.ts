import { ObjectId } from "mongoose";
import UsuarioModel from "./usuario.model";
import MarcaModel from "./marca.model";
import CategoriaModel from "./categoria.model";

export default interface ProdutoModel {
  _id: ObjectId;
  nome: string;
  descricao: string;
  preco: number;
  fotos: Array<string>;
  ativo?: boolean;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
  marca: MarcaModel;
  categoria: CategoriaModel;
  usuario: UsuarioModel;
}
