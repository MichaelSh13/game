export const Symbols = ["cherry", "lemon", "orange", "watermelon"] as const;
export type TSymbols = typeof Symbols[number];
