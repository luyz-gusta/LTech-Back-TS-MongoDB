import Categoria, { ICategoriaDocument } from "../../domain/entities/categoria";
import CategoriaModel from "../../domain/model/categoria.model";
import { BaseRepository } from "./base-repository";

export default class CategoriaRepository extends BaseRepository<
  CategoriaModel,
  ICategoriaDocument
> {
  constructor() {
    super(Categoria);
  }
}
