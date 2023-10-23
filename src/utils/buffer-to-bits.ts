import { BYTE_LENGTH } from "../constants";

export const bufferToBits = (buffer: Buffer): string => {
  let bits: string = "";
  buffer.forEach((value) => {
    bits += value.toString(2).padStart(BYTE_LENGTH, "0");
  });
  const minBits = Math.ceil(bits.length / BYTE_LENGTH) * BYTE_LENGTH;
  return bits.padEnd(minBits, "0");
};
