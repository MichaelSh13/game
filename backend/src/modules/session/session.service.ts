import { Account } from "@prisma/client";
import { EnvConfig } from "../../config/env-config";
import { Exception } from "../../utility/error-handler/exception";
import { AccountService } from "../account/account.service";
import { CashoutDto } from "./dto/cashout.dto";

export class SessionService {
  private BEGIN_BALANCE: number;

  constructor(
    private readonly accountService: AccountService,
    private readonly envConfig: EnvConfig
  ) {
    const config = this.envConfig.getEnvConfig();
    this.BEGIN_BALANCE = config.beginBalance || 10;
  }

  generate() {
    return this.BEGIN_BALANCE;
  }

  async cashout(
    { accountId }: CashoutDto,
    incomeBalance: number
  ): Promise<Account> {
    try {
      if (incomeBalance <= 0) {
        throw Exception.badRequest("Balance too small.");
      }

      if (accountId) {
        const { balance } = await this.accountService.getById(accountId);
        return this.accountService.update(accountId, {
          balance: balance + incomeBalance,
        });
      }

      return this.accountService.create(incomeBalance);
    } catch (error) {
      throw Exception.badRequest("Not saved.");
    }
  }
}
