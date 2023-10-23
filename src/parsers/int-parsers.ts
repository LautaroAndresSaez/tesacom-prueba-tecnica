import { BitsParser, NumberToBitsParser } from "../types/parsers";

export const intToBits: NumberToBitsParser = (value, n) => {
  if (!n || n < 2 || n > 32)
    throw new Error("Number of bits must be between 2 and 32");
  if (value === 0) return "".padStart(n, "0");
  if (value > 0) {
    return value.toString(2).padStart(n, "0");
  }
  const c2 = Math.pow(2, n) + value;
  return c2.toString(2);
};

export const bitsToInt: BitsParser = (bits) => {
  if (bits.length < 2 || bits.length > 32)
    throw new Error("length of bits must be between 2 and 32");
  if (bits[0] === "0") return parseInt(bits, 2);
  const c2 = parseInt(bits, 2);
  return c2 - Math.pow(2, bits.length);
};
