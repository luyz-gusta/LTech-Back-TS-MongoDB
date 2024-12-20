import * as yup from "yup";
import { pt } from "yup-locale-pt";
import MarcaModel from "../../domain/model/marca.model";
import { ObjectId } from "mongoose";
import CategoriaModel from "../../domain/model/categoria.model";

yup.setLocale(pt);

const categoriaSchema: yup.ObjectSchema<
  Omit<CategoriaModel, "_id" | "ativo" | "dataCadastro">
> = yup.object({
  nome: yup.string().required().min(3).max(50),
  usuario: yup.mixed<ObjectId>().required(),
  dataAtualizacao: yup.date().optional(),
});

export default categoriaSchema;
