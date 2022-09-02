import { AccountRouter } from "../modules/account/account.router";
import { GameRouter } from "../modules/game/game.router";
import { SessionRouter } from "../modules/session/session.router";
import { BaseRouter } from "./base-router";

export class RouterRegistry extends BaseRouter {
  constructor(
    private readonly accountRouter: AccountRouter,
    private readonly sessionRouter: SessionRouter,
    private readonly gameRouter: GameRouter
  ) {
    super();
    this.registerRoutes();
  }

  registerRoutes(): void {
    this.router.use("/account", this.accountRouter.getRouter());
    this.router.use("/session", this.sessionRouter.getRouter());
    this.router.use("/game", this.gameRouter.getRouter());
  }
}
