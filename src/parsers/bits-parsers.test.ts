import { floatToBits } from "./bits-parsers";

describe("Test in bits parsers functions", () => {
  it("should convert positive float to bits", () => {
    const bits = floatToBits(12.5);
    expect(bits).toBe("01000001010010000000000000000000");
  });

  it("should convert negative float to bits", () => {
    const bits = floatToBits(-12.5);
    expect(bits).toBe("11000001010010000000000000000000");
  });
});
