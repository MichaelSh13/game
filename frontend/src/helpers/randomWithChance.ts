export const randomWithChance = (chanceProcent: number) => {
  return Math.floor(Math.random() * 100) + 1 <= chanceProcent;
};
