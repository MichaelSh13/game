import { Exception } from "../../utility/error-handler/exception";
import { Logger } from "../../utility/logger";
import { RollingGame } from "./business-logic/game";

export class GameService {
  constructor(private readonly logger: Logger) {}

  roll(balance: number) {
    try {
      const game = new RollingGame(balance);

      const result = game.play();

      return {
        balance: game.balance,
        ...result,
      };
    } catch (error) {
      const { message } = error as Error;

      this.logger.getLogger().warn(message);
      throw Exception.badRequest(message);
    }
  }
}
