import { floatToBits, intToBits, uintToBits } from "./parsers/bits-parsers";
import { Encode } from "./types";
import { Format } from "./types/format";

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
        default:
          throw new Error(`${formatType} is not supported`);
      }
    })
    .join("");

  const hexSequence = BigInt(`0b${sequence}`).toString(16);
  return {
    size: sequence.length,
    buffer: Buffer.from(hexSequence, "hex"),
  };
};
