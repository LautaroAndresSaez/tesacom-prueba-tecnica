import { FLOAT_BITS, FLOAT_EXP_LENGTH, FLOAT_EXP_OFFSET } from "../constants";
import { BitsParser } from "../types/parsers";

export const bitsToFloat: BitsParser = (bits) => {
  if (bits.length < FLOAT_BITS) throw new Error("Invalid float");
  const sign = bits[0] === "1" ? -1 : 1;
  const exp =
    parseInt(bits.slice(1, FLOAT_EXP_LENGTH + 1), 2) - FLOAT_EXP_OFFSET;
  const coeff = bits
    .slice(FLOAT_EXP_LENGTH + 1)
    .split("")
    .map((x, i) => parseInt(x) * Math.pow(2, -i - 1))
    .reduce((acc, x) => acc + x, 1);
  return sign * Math.pow(2, exp) * coeff;
};

export const intParser: BitsParser = (bits) => {
  if (bits.length < 2 || bits.length > 32)
    throw new Error("len must be between 2 and 32");
  if (bits[0] === "0") return parseInt(bits, 2);
  const c2 = parseInt(bits, 2);
  return c2 - Math.pow(2, bits.length);
};
