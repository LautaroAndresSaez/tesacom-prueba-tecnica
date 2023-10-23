import {
  FLOAT_COEFF_LENGTH,
  FLOAT_EXP_LENGTH,
  FLOAT_EXP_OFFSET,
} from "../constants";
import { NumberToBitsParser } from "../types/parsers";

export const floatToBits: NumberToBitsParser = (value) => {
  const sign = value < 0 ? "1" : "0";
  //Need positive value to represent exponent and coefficient
  value = Math.abs(value);
  const stringValue = value.toString(2);
  const rawExp = stringValue.split(".")[0].length - 1 + FLOAT_EXP_OFFSET;
  const exp = rawExp.toString(2).padStart(FLOAT_EXP_LENGTH, "0");

  const coeff = stringValue
    .split("")
    .filter((x, i) => x !== "." && i !== 0)
    .join("")
    .padEnd(FLOAT_COEFF_LENGTH, "0");

  return `${sign}${exp}${coeff}`;
};

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
