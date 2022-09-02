import {
  asClass,
  AwilixContainer,
  createContainer,
  InjectionMode,
} from "awilix";
import { EnvConfig } from "./config/env-config";
import { DBService } from "./database/database-connector";
import { ExpressApp } from "./express-app";
import { AccountRepository } from "./modules/account/account.repository";
import { AccountRouter } from "./modules/account/account.router";
import { AccountService } from "./modules/account/account.service";
import { SessionRouter } from "./modules/session/session.router";
import { SessionService } from "./modules/session/session.service";
import { RouterRegistry } from "./router/router-registry";
import { ErrorHandler } from "./utility/error-handler";
import { Logger } from "./utility/logger";
import { Sessions } from "./session";
import { SessionGuard } from "./modules/session/session.guard";
import { GameRouter } from "./modules/game/game.router";
import { GameService } from "./modules/game/game.service";

export class ContainerRegistry {
  private container!: AwilixContainer;

  private createContainer() {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC,
    });
  }

  private register() {
    this.container.register({
      expressApp: asClass(ExpressApp).singleton(),

      envConfig: asClass(EnvConfig).singleton(),
      dbService: asClass(DBService).singleton(),
      session: asClass(Sessions).singleton(),
      errorHandler: asClass(ErrorHandler).singleton(),

      logger: asClass(Logger).singleton(),

      sessionGuard: asClass(SessionGuard).singleton(),

      routerRegistry: asClass(RouterRegistry).singleton(),
      accountRouter: asClass(AccountRouter).singleton(),
      sessionRouter: asClass(SessionRouter).singleton(),
      gameRouter: asClass(GameRouter).singleton(),

      accountService: asClass(AccountService).singleton(),
      sessionService: asClass(SessionService).singleton(),
      gameService: asClass(GameService).singleton(),

      accountRepository: asClass(AccountRepository).singleton(),
    });
  }

  getContainer() {
    if (this.container === undefined) {
      this.createContainer();
      this.register();
    }

    return this.container;
  }
}
