import { NextFunction, Request, Response } from "express";
import { Exception } from "./exception";

export class ErrorHandler {
  middleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof Exception) {
      res.status(err.code).json(err.message);
      return;
    }

    res.status(500).json("Something went wrong.");
  }
}
