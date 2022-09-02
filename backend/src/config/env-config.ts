import Dotenv from "dotenv";
import Joi from "joi";
import { Config } from "./config.interface";

export class EnvConfig {
  private config!: Config;

  private loadEnvVariables() {
    Dotenv.config();
  }

  private validateEnvSchema() {
    const envSchema = Joi.object<Config>().keys({
      common: {
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().required(),
      },
      session: {
        cookieMaxAge: Joi.number().required(),
        storageCheckPeriod: Joi.number().required(),
      },
      beginBalance: Joi.number().optional(),
    });

    const result = envSchema.validate({
      common: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: +process.env.PORT!,
      },
      session: {
        cookieMaxAge: 1000 * 60 * 60 * 24,
        storageCheckPeriod: 2 * 60 * 1000,
      },
      beginBalance: 10,
    } as Config);

    if (result.error || !result.value) {
      throw new Error(result.error.stack);
    }

    this.config = result.value;
  }

  getEnvConfig() {
    if (!this.config) {
      this.loadEnvVariables();
      this.validateEnvSchema();
    }

    return this.config;
  }
}
