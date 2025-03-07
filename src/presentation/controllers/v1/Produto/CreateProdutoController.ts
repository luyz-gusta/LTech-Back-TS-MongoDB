import ProdutoModel from "../../../../domain/model/produto.model";
import ProdutoRepository from "../../../../infra/repositories/produto-repository";
import cloudinary from "../../../config/cloudnary";
import { created, handleDatabaseError } from "../../../helpers/http-helpers";
import { IController } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class CreateProdutoController implements IController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const product: ProdutoModel = httpRequest.body;
      const urls = [];
      const files: string[] = product.fotos;

      for (const file of files) {
        const result = await cloudinary.v2.uploader.upload(file, {
          folder: "LTech",
          resource_type: "image",
        });

        urls.push(result.secure_url);
      }

      product.fotos = urls;

      console.log(urls);
      const newProduct = await this.produtoRepository.create(httpRequest.body, [
        "usuario",
        "marca",
        "categoria",
      ]);

      return created(newProduct);
    } catch (error) {
      console.log(error);
      return handleDatabaseError(error);
    }
  }
}
