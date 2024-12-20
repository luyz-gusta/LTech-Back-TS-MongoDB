import mongoose, { Schema } from "mongoose";
import ProdutoModel from "../model/produto.model";

export interface IProdutoDocument extends ProdutoModel, Document {}

const produtoSchema = new Schema<IProdutoDocument>({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  fotos: [{ type: String, required: true }],
  ativo: { type: Boolean, default: true },
  estadoProduto: {type: String, required: true},
  dataCadastro: {
    type: Date,
    default: () => {
      const now = new Date();
      now.setHours(now.getHours() - 3);
      return now;
    },
  },
  dataAtualizacao: {
    type: Date,
    default: () => {
      const now = new Date();
      now.setHours(now.getHours() - 3);
      return now;
    },
  },
  marca: { type: Schema.Types.ObjectId, ref: "Marca" },
  categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
});

const Produto = mongoose.model<IProdutoDocument>("Produto", produtoSchema);

export default Produto;
