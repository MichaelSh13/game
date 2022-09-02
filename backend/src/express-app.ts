import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { Server } from "http";
import morgan from "morgan";
import { EnvConfig } from "./config/env-config";
import { RouterRegistry } from "./router/router-registry";
import { Logger } from "./utility/logger";
import { Sessions } from "./session";
import httpContext from "express-http-context";
import { ErrorHandler } from "./utility/error-handler";

export class ExpressApp {
  private app!: express.Application;
  private server!: Server;

  constructor(
    private readonly envConfig: EnvConfig,
    private readonly logger: Logger,
    private readonly session: Sessions,
    private readonly routerRegistry: RouterRegistry,
    private readonly errorHandler: ErrorHandler
  ) {}

  start() {
    this.app = express();
    this.registerBeforeMiddleware();

    this.registerRouter();

    this.registerAfterMiddleware();

    const config = this.envConfig.getEnvConfig();
    this.server = this.app.listen(config.common.PORT, () => {
      this.logger
        .getLogger()
        .info(`Server listening on port ${config.common.PORT}`);
    });
  }

  stop() {
    return new Promise<void>((resolve) => {
      if (this.server !== undefined) {
        this.server.close(() => {
          this.logger.getLogger().info("The server is now closed.");
          resolve();
        });
      }
    });
  }

  private registerBeforeMiddleware() {
    this.app.use(httpContext.middleware);
    this.app.use(morgan("tiny"));
    this.app.use(compression());
    this.app.use(helmet());
    // TODO: fix this.
    this.app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(this.session.getSession());
  }

  private registerRouter() {
    this.app.use(this.routerRegistry.getRouter());
  }

  private registerAfterMiddleware() {
    this.app.use(this.errorHandler.middleware);
  }
}
