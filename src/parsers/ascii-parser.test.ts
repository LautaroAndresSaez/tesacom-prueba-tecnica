import { asciiToBits, bitsToAscii } from "./ascii-parser";

describe("Test ascii parser", () => {
  it("should parse ASCII string", () => {
    const asciiText = "1001000110100101000110110000";
    const { bits, text } = bitsToAscii(asciiText);
    expect(text).toBe("Hi#0");
    expect(bits).toBe("");
  });

  it("should parse ASCII string and", () => {
    const asciiText = "1001000110100101000110110000100"; //Hi#0 + uint(4)
    const { bits, text } = bitsToAscii(asciiText);
    expect(text).toBe("Hi#0");
    expect(bits).toBe("100");
  });

  it("should convert text to bits", () => {
    const text = "Hi";
    const bits = asciiToBits(text);
    expect(bits).toBe("1001000110100101000110110000");
  });
});
