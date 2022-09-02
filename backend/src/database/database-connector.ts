import { PrismaClient } from "@prisma/client";

export class DBService {
  private _db!: PrismaClient;

  async init() {
    this._db = new PrismaClient();
  }

  get db(): PrismaClient {
    if (!this._db) {
      throw new Error("Database is not connected.");
    }

    return this._db;
  }
}
