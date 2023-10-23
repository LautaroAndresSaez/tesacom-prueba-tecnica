import { bitsToInt, intToBits } from "./int-parsers";

describe("Test int parsers", () => {
  it("should encode 0", () => {
    const result = intToBits(0, 5);
    expect(result).toBe("00000");
  });

  it("should encode negative number using 4 bits", () => {
    const result = intToBits(-4, 4);
    expect(result).toBe("1100");
  });

  it("should enconde positive number using 6 bits", () => {
    const result = intToBits(4, 8);
    expect(result).toHaveLength(8);
    expect(result).toBe("00000100");
  });

  it("should parse bits to positive int", () => {
    const int = bitsToInt("010");
    expect(int).toBe(2);
  });

  it("should parse bits to negative int", () => {
    const int = bitsToInt("10000001");
    expect(int).toBe(-127);
  });
});
