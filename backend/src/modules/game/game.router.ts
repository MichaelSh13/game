import { BaseRouter } from "../../router/base-router";
import { SessionGuard } from "../session/session.guard";
import { GameService } from "./game.service";
import httpContext from "express-http-context";
import { BALANCE } from "../session/balance.const";
import { Logger } from "../../utility/logger";

export class GameRouter extends BaseRouter {
  constructor(
    private readonly gameService: GameService,
    private readonly logger: Logger,
    private readonly sessionGuard: SessionGuard
  ) {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post("/roll", this.sessionGuard.isAuth, (req, res, next) => {
      try {
        // TODO: Create HttpContext class and use it instead.
        const balance = httpContext.get(BALANCE);

        // TODO: Reload session if contine plaing.
        const result = this.gameService.roll(balance);

        req.session._balance = result.balance;

        res.json(result);
      } catch (error) {
        this.logger.getLogger().error(error);
        next(error);
      }
    });
  }
}
