import { asciiToBits, bitsToAscii } from "./parsers/ascii-parser";
import { floatToBits, intToBits, uintToBits } from "./parsers/bits-parsers";
import { bitsToFloat, bitsToInt, bitsToUint } from "./parsers/numeric-parsers";
import { Decode, Encode } from "./types";
import { Entrie } from "./types/entries";
import { Format } from "./types/format";
import { bufferToBits } from "./utils/buffer-to-bits";
import { crop } from "./utils/crop-bits";
import { entriesToObject } from "./utils/entries-to-object";

export const encode: Encode = (obj, format) => {
  if (format.length === 0)
    throw new Error("format length must be greater than 0");

  const sequence = format
    .map((formatItem) => {
      const keys = formatItem.tag.split(".");
      const formatType = formatItem.type;
      const value = keys.reduce((sub, key) => sub[key], obj);
      if (!value)
        throw new Error(`${formatItem.tag} has not exist in ${format}`);
      switch (formatType) {
        case "uint":
          return uintToBits(value, formatItem.len);
        case "int":
          return intToBits(value, formatItem.len);
        case "float":
          return floatToBits(value);
        case "ascii":
          return asciiToBits(value);
      }
    })
    .join("");

  const hexSequence = BigInt(`0b${sequence}`).toString(16);
  return {
    size: sequence.length,
    buffer: Buffer.from(hexSequence, "hex"),
  };
};

export const decode: Decode = (buffer, format) => {
  let bits = bufferToBits(buffer);
  const entries: Entrie[] = format.map((formatItem) => {
    const cropResult = crop(bits, formatItem);
    bits = cropResult.bits;
    const { tag } = formatItem;
    const { value } = cropResult;
    switch (formatItem.type) {
      case "uint":
        return [tag, bitsToUint(value)];
      case "int":
        return [tag, bitsToInt(value)];
      case "float":
        return [tag, bitsToFloat(value)];
      case "ascii":
        const result = bitsToAscii(bits);
        bits = result.bits;
        return [tag, result.text];
    }
  });

  return entriesToObject(entries);
};
