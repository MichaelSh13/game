import { Account } from "@prisma/client";

export class AccountEntity implements Account {
  id!: string;
  balance!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
