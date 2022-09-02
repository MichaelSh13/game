import Winston from "winston";
import { EnvConfig } from "../config/env-config";

export class Logger {
  private logger!: Winston.Logger;

  constructor(private readonly envConfig: EnvConfig) {}

  public getLogger() {
    if (this.logger === undefined) {
      this.createLogger();
    }

    return this.logger;
  }

  private createLogger() {
    this.logger = Winston.createLogger();

    const config = this.envConfig.getEnvConfig();
    if (config.common.NODE_ENV === "development") {
      this.logger.add(
        new Winston.transports.Console({
          format: Winston.format.simple(),
          level: "debug",
        })
      );
    }
  }
}
