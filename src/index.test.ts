import { encode } from ".";
import { Format } from "./types/format";

describe("Test encode", () => {
  it("should encode int values", () => {
    const format: Format = [
      { tag: "PTemp", type: "int", len: 12 },
      { tag: "BattVolt.value", type: "int", len: 12 },
      { tag: "WaterLevel", type: "int", len: 8 },
    ];
    const data = { PTemp: 268, BattVolt: { value: 224 }, WaterLevel: 115 };
    const result = encode(data, format);
    expect(result.buffer.toString("hex")).toBe("10c0e073");
    expect(result.size).toBe(32);
  });
});
