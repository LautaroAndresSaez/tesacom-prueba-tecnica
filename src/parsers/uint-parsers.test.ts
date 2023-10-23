import { bitsToUint, uintToBits } from "./uint-parsers";

describe("Test numeric parser functions", () => {
  it("should parse bits to uint", () => {
    const uint = bitsToUint("10011");
    expect(uint).toBe(19);
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
