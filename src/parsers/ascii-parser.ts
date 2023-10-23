import { ASCII_LENGTH, TEXT_END } from "../constants";

export const bitsToAscii = (
  bits: string,
  text = ""
): { bits: string; text: string } => {
  if (text.endsWith(TEXT_END)) {
    return {
      bits,
      text,
    };
  }
  if (bits.length === 0) throw new Error("Invalid bits string");
  const rawCaracter = parseInt(bits.slice(0, ASCII_LENGTH), 2);
  const caracter = String.fromCharCode(rawCaracter);
  bits = bits.slice(ASCII_LENGTH);
  return bitsToAscii(bits, text + caracter);
};

export const asciiToBits = (text: string): string => {
  if (!text.endsWith(TEXT_END)) {
    text += TEXT_END;
  }
  return text
    .split("")
    .map((letter) => {
      const bits = letter.charCodeAt(0).toString(2).padStart(ASCII_LENGTH, "0");
      if (bits.length > ASCII_LENGTH)
        throw new Error(`${letter} is nnvalid character`);
      return bits;
    })
    .join("");
};
