import { bitsToFloat, floatToBits } from "./float-parser";

describe("Test float parsers", () => {
  it("should convert positive float to bits", () => {
    const bits = floatToBits(12.5);
    expect(bits).toBe("01000001010010000000000000000000");
  });

  it("should convert negative float to bits", () => {
    const bits = floatToBits(-12.5);
    expect(bits).toBe("11000001010010000000000000000000");
  });

  it("should parse bits to float", () => {
    const float = bitsToFloat("01000001010010000000000000000000");
    expect(float).toBeCloseTo(12.5);
  });

  it("should parse bits to negative float", () => {
    const float = bitsToFloat("11000001010010000000000000000000");
    expect(float).toBeCloseTo(-12.5);
  });
});
