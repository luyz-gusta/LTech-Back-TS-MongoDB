/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { NextFunction, Request, Response } from "express";
import { IController } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http";

export const adaptRoute = (controller: IController) => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    const httpRequest: HttpRequest = {
      body: request.body,
      query: request.query,
      params: request.params,
      headers: request.headers,
      nextFunction: next,
    };

    const httpResponse: HttpResponse = await controller.handle(httpRequest);

    httpResponse.headers !== undefined
      ? response.set(httpResponse.headers)
      : null;
    response.status(httpResponse.statusCode).json(httpResponse);
  };
};
