import { RollingMachine } from "./machine";

enum Symbols {
  CHERRY = "CHERRY",
  LEMON = "LEMON",
  ORANGE = "ORANGE",
  WATERMELON = "WATERMELON",
}
const symbolsCosts = {
  [Symbols.CHERRY]: 10,
  [Symbols.LEMON]: 20,
  [Symbols.ORANGE]: 30,
  [Symbols.WATERMELON]: 40,
};

describe("Machine", () => {
  let machine: InstanceType<typeof RollingMachine>;
  let machineProto: Record<string, any>;
  const ROUNDS = 3;

  beforeEach(() => {
    machine = new RollingMachine<Record<keyof typeof Symbols, Symbols>>(
      symbolsCosts,
      ROUNDS
    );
    machineProto = Object.getPrototypeOf(machine);
  });

  it("randomKey", () => {
    const key = machineProto.randomKey.call(machine);

    expect(Object.keys(Symbols)).toContain(key);
  });

  describe("roll", () => {
    let mockObj: Record<string, any>;

    beforeEach(() => {
      mockObj = {
        randomKey: jest.fn(() => Symbols.CHERRY),
        ROUNDS: 3,
      };
    });

    it("roll", () => {
      const arr: string[] = machineProto.roll.call(mockObj);

      expect(mockObj.randomKey).toBeCalledTimes(mockObj.ROUNDS);
      expect(arr.length).toBe(ROUNDS);

      const types = arr.map((item) => typeof item);
      const uniqTypes = [...new Set(types)];
      expect(uniqTypes.length).toBe(1);
      expect(typeof uniqTypes[0]).toBe("string");
    });
  });

  describe("countFromRow", () => {
    it("different items", () => {
      const value: number = machineProto.countFromRow.call(machine, [
        "item1",
        "item2",
        3,
        Symbol(),
      ]);

      expect(value).toBe(0);
    });

    describe("same items", () => {
      it("Cherry", () => {
        const value: string[] = machineProto.countFromRow.call(machine, [
          Symbols.CHERRY,
          Symbols.CHERRY,
          Symbols.CHERRY,
        ]);

        expect(value).toBe(10);
      });

      it("Cherry", () => {
        const value: string[] = machineProto.countFromRow.call(machine, [
          Symbols.LEMON,
          Symbols.LEMON,
        ]);

        expect(value).toBe(20);
      });
      it("Cherry", () => {
        const value: string[] = machineProto.countFromRow.call(machine, [
          Symbols.WATERMELON,
          Symbols.WATERMELON,
          Symbols.WATERMELON,
          Symbols.WATERMELON,
        ]);

        expect(value).toBe(40);
      });
    });
  });

  describe("rollAndCount", () => {
    let mockObj: Record<string, any>;

    beforeEach(() => {
      mockObj = {
        roll: jest.fn(() => [Symbols.CHERRY, Symbols.LEMON]),
        countFromRow: jest.fn(() => 0),
      };
    });

    it("rollAndCount", () => {
      const obj: Record<string, any> = machineProto.rollAndCount.call(mockObj);

      expect(typeof obj).toBe("object");
      expect(mockObj.roll).toBeCalled();
      expect(mockObj.countFromRow).toBeCalled();
    });
  });
});
