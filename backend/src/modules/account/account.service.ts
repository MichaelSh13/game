import { Account } from "@prisma/client";
import { Exception } from "../../utility/error-handler/exception";
import { AccountRepository } from "./account.repository";

export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  update(id: string, updateData: Partial<Account>): Promise<Account> {
    return this.accountRepository.update(id, updateData);
  }

  create(balance: number): Promise<Account> {
    return this.accountRepository.create(balance);
  }

  getById(id: string): Promise<Account> {
    try {
      return this.accountRepository.getById(id);
    } catch (error) {
      const { message } = error as Error;
      throw Exception.badRequest(message);
    }
  }

  getAll() {
    try {
      return this.accountRepository.getAll();
    } catch (error) {
      const { message } = error as Error;
      throw Exception.badRequest(message);
    }
  }
}
