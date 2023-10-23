import { BYTE_LENGTH } from "../constants";

export const bufferToBits = (buffer: Buffer): string => {
  const bits: string[] = [];
  buffer.forEach((value) =>
    bits.push(value.toString(2).padStart(BYTE_LENGTH, "0"))
  );
  return bits.join("");
};
