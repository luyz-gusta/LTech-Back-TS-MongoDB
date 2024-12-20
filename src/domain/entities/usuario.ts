import mongoose, { Schema } from "mongoose";
import UsuarioModel from "../model/usuario.model";

export interface IUsuarioDocument extends UsuarioModel, Document {}

const usuarioSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
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
  ultimoLogin: {
    type: Date,
    default: null,
  },
  tipoUsuario: {
    type: String,
    required: true,
  },
  fotoPerfil: {
    type: String,
    required: true,
  },
});

const Usuario = mongoose.model<IUsuarioDocument>("Usuario", usuarioSchema);

export default Usuario