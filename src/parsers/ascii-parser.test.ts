import { bitsToAscii } from "./ascii-parser";

describe("Test ascii parser", () => {
  it("should parse ascii string", () => {
    const asciiText = "1001000110100101000110110000";
    const { bits, text } = bitsToAscii(asciiText);
    expect(text).toBe("Hi#0");
    expect(bits).toBe("");
  });
});
