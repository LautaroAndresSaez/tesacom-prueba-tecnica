import { floatToBits, intToBits, uintToBits } from "./bits-parsers";

describe("Test in bits parsers functions", () => {
  it("should convert positive float to bits", () => {
    const bits = floatToBits(12.5);
    expect(bits).toBe("01000001010010000000000000000000");
  });

  it("should convert negative float to bits", () => {
    const bits = floatToBits(-12.5);
    expect(bits).toBe("11000001010010000000000000000000");
  });

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

  it("should encode 2bits correctly", () => {
    const result = uintToBits(2, 2);
    expect(result).toBe("10");
  });

  it("should encode 2 in 4bits correctly", () => {
    const result = uintToBits(2, 4);
    expect(result).toBe("0010");
  });
});
