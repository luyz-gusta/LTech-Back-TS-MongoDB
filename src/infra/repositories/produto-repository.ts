import Produto, { IProdutoDocument } from "../../domain/entities/produto";
import ProdutoModel from "../../domain/model/produto.model";
import { BaseRepository } from "./base-repository";

export default class ProdutoRepository extends BaseRepository<
  ProdutoModel,
  IProdutoDocument
> {
  constructor() {
    super(Produto);
  }
}
