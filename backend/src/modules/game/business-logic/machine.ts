export class RollingMachine<T extends Record<string, string>> {
  constructor(
    private symbols: Record<keyof T, number>,
    private ROUNDS: number = 3
  ) {}

  protected rollAndCount() {
    const row = this.roll();

    const win = this.countFromRow(row);

    return { row, win };
  }

  private countFromRow(row: Array<keyof T>): number {
    const uniqueRow = [...new Set(row)];
    if (uniqueRow.length !== 1) {
      return 0;
    }

    const symbol = uniqueRow[0];
    const win = this.symbols[symbol];
    return win;
  }

  private roll() {
    const row: Array<keyof T> = [];

    Array(this.ROUNDS)
      .fill("")
      .forEach(() => {
        const symbol = this.randomKey();

        row.push(symbol);
      });

    return row;
  }

  private randomKey(): keyof T {
    let keys = Object.keys(this.symbols) as [keyof T];

    let item = keys[Math.floor(Math.random() * keys.length)];

    return item;
  }
}
