import { Request, Response, NextFunction } from "express";
import { stringHelper } from "../utils/strings";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const message = stringHelper.notFound;

  response.status(404).send(message);
};