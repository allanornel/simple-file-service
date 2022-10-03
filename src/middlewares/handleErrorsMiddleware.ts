import { NextFunction, Request, Response } from "express";

import { errorTypeToStatusCode, isAppError } from "../utils/errorUtils.js";

export default function handleErrorsMiddleware(err, req: Request, res: Response, next: NextFunction) {
  console.log("Opps! An error occured!", err);

  if (isAppError(err)) {
    const statusCode = errorTypeToStatusCode(err.type);
    return res.status(statusCode).send(err.message);
  }

  res.sendStatus(500);
}
