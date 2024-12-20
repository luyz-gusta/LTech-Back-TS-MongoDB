import mongoose, { Schema } from "mongoose";
import MarcaModel from "../model/marca.model";

export interface IMarcaDocument extends MarcaModel, Document {}

const marcaSchema = new Schema({
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

const Marca = mongoose.model<IMarcaDocument>("Marca", marcaSchema);

export default Marca;
