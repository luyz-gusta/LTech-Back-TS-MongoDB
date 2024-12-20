import mongoose, { Schema } from "mongoose";
import CategoriaModel from "../model/categoria.model";

export interface ICategoriaDocument extends CategoriaModel, Document {}

const categoriaSchema = new Schema({
  nome: { type: String, required: true, unique: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  ativo: {
    type: Boolean,
    default: true,
  },
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
});

const Categoria = mongoose.model<ICategoriaDocument>(
  "Categoria",
  categoriaSchema
);

export default Categoria;
