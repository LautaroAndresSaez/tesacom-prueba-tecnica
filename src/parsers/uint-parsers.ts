import { BitsParser, NumberToBitsParser } from "../types/parsers";

export const uintToBits: NumberToBitsParser = (value, n) => {
  if (!n || n < 1 || n > 32)
    throw new Error("Number of bits must be between 1 and 32");
  const encodedValue = value.toString(2);
  if (encodedValue.length > n)
    throw new Error(`len must be greater than ${encodedValue.length}`);
  return encodedValue.padStart(n, "0");
};

export const bitsToUint: BitsParser = (bits) => {
  if (bits.length < 1 || bits.length > 32)
    throw new Error("length of bits must be between 1 and 32");
  return parseInt(bits, 2);
};
