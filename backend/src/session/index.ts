import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { DBService } from "../database/database-connector";
import { RequestHandler } from "express";
import { EnvConfig } from "../config/env-config";

export class Sessions {
  private session!: RequestHandler;

  constructor(
    private readonly dbService: DBService,
    private readonly envConfig: EnvConfig
  ) {}

  public getSession() {
    if (this.session === undefined) {
      this.createSession();
    }

    return this.session;
  }

  private createSession() {
    this.session = session({
      secret: "sldfs",
      saveUninitialized: true,
      cookie: {
        maxAge: this.envConfig.getEnvConfig().session.cookieMaxAge,
      },
      resave: false,
      store: this.generateStore(),
    });
  }

  private generateStore() {
    return new PrismaSessionStore(this.dbService.db, {
      checkPeriod: this.envConfig.getEnvConfig().session.storageCheckPeriod,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    });
  }
}
