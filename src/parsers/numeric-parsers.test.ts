import { bitsToFloat, bitsToInt, bitsToUint } from "./numeric-parsers";

describe("Test numeric parser functions", () => {
  it("should parse bits to float", () => {
    const float = bitsToFloat("01000001010010000000000000000000");
    expect(float).toBeCloseTo(12.5);
  });

  it("should parse bits to negative float", () => {
    const float = bitsToFloat("11000001010010000000000000000000");
    expect(float).toBeCloseTo(-12.5);
  });

  it("should parse bits to positive int", () => {
    const int = bitsToInt("010");
    expect(int).toBe(2);
  });

  it("should parse bits to negative int", () => {
    const int = bitsToInt("10000001");
    expect(int).toBe(-127);
  });

  it("should parse bits to uint", () => {
    const uint = bitsToUint("10011");
    expect(uint).toBe(19);
  });
});
