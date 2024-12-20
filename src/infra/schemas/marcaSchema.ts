import * as yup from "yup";
import { pt } from "yup-locale-pt";
import MarcaModel from "../../domain/model/marca.model";
import { ObjectId } from "mongoose";

yup.setLocale(pt);

const marcaSchema: yup.ObjectSchema<
  Omit<MarcaModel, "_id" | "ativo" | "dataCadastro">
> = yup.object({
  nome: yup.string().required().min(2).max(50),
  usuario: yup.mixed<ObjectId>().required(),
  dataAtualizacao: yup.date().optional(),
});

export default marcaSchema;
