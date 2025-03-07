import { HttpRequest, HttpResponse } from "./http";

export interface IController {
  handle(http: HttpRequest): Promise<HttpResponse>;
}
