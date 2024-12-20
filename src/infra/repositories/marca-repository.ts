import Marca, { IMarcaDocument } from "../../domain/entities/marca";
import MarcaModel from "../../domain/model/marca.model";
import { BaseRepository } from "./base-repository";

export default class MarcaRepository extends BaseRepository<
  MarcaModel,
  IMarcaDocument
> {
  constructor() {
    super(Marca);
  }
}
