import { Request, Response, NextFunction } from "express";
import httpContext from "express-http-context";
import { Exception } from "../../utility/error-handler/exception";
import { BALANCE } from "./balance.const";

export class SessionGuard {
  isAuth(req: Request, res: Response, next: NextFunction) {
    const balance = req.session._balance;
    if (balance === undefined) {
      next(Exception.unauthorized());
      return;
    }

    // TODO: DI for httpContext?
    httpContext.set(BALANCE, balance);

    next();
  }

  isNotAuth(req: Request, res: Response, next: NextFunction) {
    const balance = req.session._balance;
    if (balance !== undefined) {
      next(Exception.badRequest("Only not authed."));
      return;
    }

    next();
  }
}
