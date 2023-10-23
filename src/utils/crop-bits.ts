import { ASCII_LENGTH, FLOAT_BITS } from "../constants";
import { FormatItem } from "../types/format";

export const crop = (bits: string, formatItem: FormatItem) => {
  const len = findLength(formatItem);
  return {
    value: bits.slice(0, len),
    bits: bits.slice(len),
  };
};

const findLength = (formatItem: FormatItem): number => {
  if (formatItem.type === "uint" || formatItem.type === "int")
    return formatItem.len;
  if (formatItem.type === "ascii") return ASCII_LENGTH;
  return FLOAT_BITS;
};
