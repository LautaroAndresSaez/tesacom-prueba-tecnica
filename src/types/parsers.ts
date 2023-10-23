export type BitsParser = (bits: string) => number | string;

export type NumberToBitsParser = (x: number, n?: number) => string;

export type AsciiToBitsParser = (c: string) => string;
