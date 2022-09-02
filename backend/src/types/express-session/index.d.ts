import { SessionData } from "express-session";

declare module "express-session" {
  export interface SessionData {
    _balance?: number;
  }
}
