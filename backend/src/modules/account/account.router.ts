import { BaseRouter } from "../../router/base-router";
import { Logger } from "../../utility/logger";
import { AccountService } from "./account.service";
import { isUUID } from "class-validator";
import { Exception } from "../../utility/error-handler/exception";

export class AccountRouter extends BaseRouter {
  constructor(
    private readonly accountService: AccountService,
    private readonly logger: Logger
  ) {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/:id", async (req, res, next) => {
      try {
        const id = req.params.id;

        const result = isUUID(id);
        if (!result) {
          // TODO: add new exception for validation.
          throw Exception.badRequest("Validation error.");
        }

        const account = await this.accountService.getById(id);

        res.json(account);
      } catch (error) {
        const { message } = error as Error;

        this.logger.getLogger().error(message);
        next(error);
      }
    });

    this.router.get("/", async (req, res, next) => {
      try {
        const accounts = await this.accountService.getAll();

        res.json(accounts);
      } catch (error) {
        const { message } = error as Error;

        this.logger.getLogger().error(message);
        next(error);
      }
    });
  }
}
