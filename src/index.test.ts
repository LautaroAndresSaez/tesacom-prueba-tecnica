import { decode, encode } from ".";
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

describe("Test decode", () => {
  it("should decode int values", () => {
    const buffer = Buffer.from("010203", "hex");
    const format: Format = [
      { tag: "v0", type: "int", len: 8 },
      { tag: "v1", type: "int", len: 8 },
      { tag: "v2", type: "int", len: 8 },
    ];
    expect(decode(buffer, format)).toMatchObject({
      v0: 1,
      v1: 2,
      v2: 3,
    });
  });

  it("should decode format with nested tags", () => {
    const format: Format = [
      { tag: "var0.temp", type: "uint", len: 2 },
      { tag: "var0.temp2", type: "int", len: 3 },
      { tag: "var1.value", type: "uint", len: 3 },
    ];
    const buffer = Buffer.from("bc", "hex"); // 1011-1100
    const result = decode(buffer, format);
    expect(result).toMatchObject({
      var0: {
        temp: 2,
        temp2: -1,
      },
      var1: {
        value: 4,
      },
    });
  });
});
