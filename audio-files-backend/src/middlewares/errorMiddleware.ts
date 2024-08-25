import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    return res.status(status).send({ error: message });
  } else {
    next();
  }
}
