import { RollingGame } from "./game";

describe("Game", () => {
  let game: InstanceType<typeof RollingGame>;
  let gameProto: Record<string, any>;

  beforeEach(() => {
    game = new RollingGame(10);
    gameProto = Object.getPrototypeOf(game);
  });

  describe("play", () => {
    let mockObj: Record<string, any>;

    beforeEach(() => {
      mockObj = {
        balance: 10,
        start: jest.fn(),
        win: jest.fn(),
        rollOrReRoll: jest.fn(() => ({ win: 0, row: ["", "1"] })),
      };
    });

    it("called and return", () => {
      const result = gameProto.play.call(mockObj);

      expect(mockObj.rollOrReRoll).toBeCalled();
      expect(mockObj.balance).toBe(9);
      expect(mockObj.rollOrReRoll).toHaveReturnedWith(result);
    });

    it("not win", () => {
      mockObj.rollOrReRoll = jest.fn(() => ({ win: 0, row: ["", "1"] }));

      gameProto.play.call(mockObj);

      expect(mockObj.balance).toBe(9);
    });

    it("win", () => {
      mockObj.rollOrReRoll = jest.fn(() => ({ win: 10, row: ["1", "1"] }));

      gameProto.play.call(mockObj);

      expect(mockObj.balance).toBe(19);
    });
  });

  describe("rollOrReRoll", () => {
    let mockObj: Record<string, any>;

    beforeEach(() => {
      mockObj = {
        balance: 10,
        rollAndCount: jest.fn(() => ({ row: ["1", ""], win: 0 })),
        rollOrReRoll: jest.fn(() => ({ row: ["1", "1"], win: 0 })),
        randomWithChance: jest.fn((_: number) => false),
      };
    });

    it("not win, called and return", () => {
      const result = gameProto.rollOrReRoll.call(mockObj);

      expect(mockObj.rollAndCount).toHaveReturnedWith(result);
      expect(mockObj.rollOrReRoll).not.toBeCalled();
      expect(mockObj.randomWithChance).not.toBeCalled();
    });

    it("win, small balance", () => {
      mockObj.rollAndCount = jest.fn(() => ({ row: ["1", "1"], win: 10 }));

      gameProto.rollOrReRoll.call(mockObj);

      expect(mockObj.rollOrReRoll).not.toBeCalled();
      expect(mockObj.randomWithChance).not.toBeCalled();
    });

    it("win, medium balance, without lucky", () => {
      mockObj.balance = 40;
      mockObj.rollAndCount = jest.fn(() => ({ row: ["1", "1"], win: 10 }));

      gameProto.rollOrReRoll.call(mockObj);

      expect(mockObj.randomWithChance).toBeCalledWith(30);
      expect(mockObj.randomWithChance).toHaveReturnedWith(false);
      expect(mockObj.rollOrReRoll).not.toBeCalled();
    });

    it("win, medium balance, with lucky", () => {
      mockObj.balance = 40;
      mockObj.randomWithChance = jest.fn(() => true);
      mockObj.rollAndCount = jest.fn(() => ({ row: ["1", "1"], win: 10 }));

      const result = gameProto.rollOrReRoll.call(mockObj);

      expect(mockObj.randomWithChance).toBeCalledWith(30);
      expect(mockObj.randomWithChance).toHaveReturnedWith(true);
      expect(mockObj.rollOrReRoll).toBeCalled();
      expect(mockObj.rollOrReRoll).toHaveReturnedWith(result);
    });

    it("win, big balance, without lucky", () => {
      mockObj.balance = 60;
      mockObj.rollAndCount = jest.fn(() => ({ row: ["1", "1"], win: 10 }));

      gameProto.rollOrReRoll.call(mockObj);

      expect(mockObj.randomWithChance).toBeCalledWith(60);
      expect(mockObj.randomWithChance).toHaveReturnedWith(false);
      expect(mockObj.rollOrReRoll).not.toBeCalled();
    });

    it("win, big balance, with lucky", () => {
      mockObj.balance = 60;
      mockObj.randomWithChance = jest.fn(() => true);
      mockObj.rollAndCount = jest.fn(() => ({ row: ["1", "1"], win: 10 }));

      const result = gameProto.rollOrReRoll.call(mockObj);

      expect(mockObj.randomWithChance).toBeCalledWith(60);
      expect(mockObj.randomWithChance).toHaveReturnedWith(true);
      expect(mockObj.rollOrReRoll).toBeCalled();
      expect(mockObj.rollOrReRoll).toHaveReturnedWith(result);
    });
  });
});
