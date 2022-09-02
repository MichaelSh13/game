import { Account } from "@prisma/client";
import { DBService } from "../../database/database-connector";

export class AccountRepository {
  constructor(private readonly dbService: DBService) {}

  update(id: string, updateData: Partial<Account>) {
    return this.dbService.db.account.update({
      data: updateData,
      where: { id },
    });
  }

  create(balance: number) {
    return this.dbService.db.account.create({
      data: {
        balance,
      },
    });
  }

  getById(id: string) {
    return this.dbService.db.account.findUniqueOrThrow({
      where: { id },
    });
  }

  getAll() {
    return this.dbService.db.account.findMany({});
  }
}
