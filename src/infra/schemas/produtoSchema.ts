import { ObjectId } from "mongoose";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import ProdutoModel from "../../domain/model/produto.model";
import { EstadoProduto } from "../types/types-global";

yup.setLocale(pt);

const produtoSchema: yup.ObjectSchema<
  Omit<ProdutoModel, "_id" | "ativo" | "dataCadastro">
> = yup.object({
  nome: yup.string().required().min(3).max(50),
  descricao: yup.string().required().min(3),
  precoVenda: yup.number().required(),
  precoPromocao: yup.number().required().nullable(),
  qntdParcelas: yup.number().optional(),
  usuario: yup.mixed<ObjectId>().required(),
  marca: yup.mixed<ObjectId>().required(),
  categoria: yup.mixed<ObjectId>().required(),
  dataAtualizacao: yup.date().optional(),
  destaque: yup.boolean().optional(),
  emEstoque: yup.boolean().optional(),
  estadoProduto: yup.mixed<EstadoProduto>().required(),
  fotos: yup
    .array()
    .of(yup.string().required())
    .min(1, "É necessário pelo menos uma foto")
    .required("A lista de fotos é obrigatória"),
});

export default produtoSchema;
