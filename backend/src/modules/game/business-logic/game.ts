import { symbolsCosts } from "./costs.const";
import { RollingMachine } from "./machine";
import { Symbols } from "./symbols.interface";

export class RollingGame extends RollingMachine<typeof Symbols> {
  constructor(public balance: number) {
    super(symbolsCosts);
  }

  public play() {
    if (this.balance < 1) {
      throw new Error("Balance too small.");
    }

    this.balance = this.balance - 1;

    const result = this.rollOrReRoll();
    if (result.win) {
      this.balance = this.balance + result.win;
    }

    return result;
  }

  private rollOrReRoll(): { row: string[]; win: number } {
    const { row, win } = this.rollAndCount();

    if (win) {
      const newBalance = this.balance + win;

      if (newBalance > 60) {
        const reRoll = this.randomWithChance(60);
        if (reRoll) {
          return this.rollOrReRoll();
        }
      }

      if (newBalance >= 40 && newBalance <= 60) {
        const reRoll = this.randomWithChance(30);
        if (reRoll) {
          return this.rollOrReRoll();
        }
      }
    }

    return { row, win };
  }

  private randomWithChance(chanceProcent: number) {
    return Math.floor(Math.random() * 100) + 1 <= chanceProcent;
  }
}
