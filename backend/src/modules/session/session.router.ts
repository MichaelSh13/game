import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import httpContext from "express-http-context";
import { BaseRouter } from "../../router/base-router";
import { Logger } from "../../utility/logger";
import { BALANCE } from "./balance.const";
import { CashoutDto } from "./dto/cashout.dto";
import { SessionGuard } from "./session.guard";
import { SessionService } from "./session.service";
import { Exception } from "../../utility/error-handler/exception";

export class SessionRouter extends BaseRouter {
  constructor(
    private readonly sessionService: SessionService,
    private readonly sessionGuard: SessionGuard,
    private readonly logger: Logger
  ) {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    // Create or return current balance;
    this.router.get("/", (req, res) => {
      let balance = req.session._balance;

      if (balance === undefined) {
        balance = this.sessionService.generate();

        req.session._balance = balance;
      }

      res.send({ balance });
    });

    // Return current balance;
    // @deprecate
    this.router.get("", this.sessionGuard.isAuth, (req, res) => {
      const balance = httpContext.get(BALANCE);

      res.json({ balance });
    });

    this.router.post(
      "/cashout",
      this.sessionGuard.isAuth,
      async (req, res, next) => {
        try {
          // TODO: implement pipe
          const cashoutData = plainToInstance(CashoutDto, req.body);
          const errors = validate(cashoutData);
          for (let error in errors) {
            next(Exception.badRequest(error.toString()));
            return;
          }

          const balance = httpContext.get(BALANCE);

          if (balance > 0) {
            await this.sessionService.cashout(cashoutData, balance);
          }

          req.session.destroy((error) => {
            if (error) {
              this.logger.getLogger().warn(error);
            }
          });

          res.send(200);
          // TODO: implement interceptor for this
        } catch (error) {
          const { message } = error as Error;

          this.logger.getLogger().error(message);
          next(error);
        }
      }
    );
  }
}
