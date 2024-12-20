import * as yup from "yup";
import { pt } from "yup-locale-pt";
import UsuarioModel from "../../domain/model/usuario.model";
import { TipoUsuario } from "../types/types-global";

yup.setLocale(pt);

const usuarioSchema: yup.ObjectSchema<
  Omit<UsuarioModel, "_id" | "ativo" | "dataCadastro">
> = yup.object({
  nome: yup.string().defined().required().max(60),
  usuario: yup.string().defined().required().max(80).min(6),
  email: yup
    .string()
    .defined()
    .required()
    .max(255)
    .matches(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
      "email inválido"
    ),
  fotoPerfil: yup.string().defined().required().max(400),
  senha: yup.string().defined().required().max(255).min(6),
  tipoUsuario: yup.mixed<TipoUsuario>().required().oneOf(["Admin", "Client"]),
  ultimoLogin: yup.date().optional().nullable(),
  dataAtualizacao: yup.date().optional(),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .defined()
    .required()
    .max(255)
    .matches(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
      "email inválido"
    ),
  senha: yup.string().defined().required().max(255).min(6),
});

export default usuarioSchema;
