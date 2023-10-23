import {
  FLOAT_BITS,
  FLOAT_COEFF_LENGTH,
  FLOAT_EXP_LENGTH,
  FLOAT_EXP_OFFSET,
} from "../constants";
import { BitsParser, NumberToBitsParser } from "../types/parsers";

export const floatToBits: NumberToBitsParser = (value) => {
  const sign = value < 0 ? "1" : "0";
  //Need positive value to represent exponent and coefficient
  value = Math.abs(value);
  const stringValue = value.toString(2);
  const rawExp = stringValue.split(".")[0].length - 1 + FLOAT_EXP_OFFSET;
  const exp = rawExp.toString(2).padStart(FLOAT_EXP_LENGTH, "0");

  const coeff = stringValue
    .split("")
    .filter((x, i) => x !== "." && i !== 0 && i < FLOAT_COEFF_LENGTH)
    .join("")
    .padEnd(FLOAT_COEFF_LENGTH, "0");

  return `${sign}${exp}${coeff}`;
};

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
