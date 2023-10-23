import { decode, encode } from ".";
import { Format } from "./types/format";

describe("Test reversibility encode-decode", () => {
  it("should encode-decode without float", () => {
    const format: Format = [
      { tag: "PTemp", type: "int", len: 12 },
      { tag: "BattVolt.value", type: "int", len: 12 },
      { tag: "WaterLevel", type: "int", len: 8 },
    ];
    const data = { PTemp: 268, BattVolt: { value: 224 }, WaterLevel: 115 };
    const result = encode(data, format);
    const decodeResult = decode(result.buffer, format);
    expect(decodeResult).toMatchObject(decodeResult);
    expect(result.size).toBe(32);
  });

  it("should encode-decode with floats", () => {
    const format: Format = [
      { tag: "PTemp", type: "int", len: 12 },
      { tag: "BattVolt.value", type: "float" },
      { tag: "WaterLevel", type: "int", len: 8 },
    ];
    const data = {
      PTemp: 268,
      BattVolt: { value: 12.1212 },
      WaterLevel: 115,
    };
    const encodeResult = encode(data, format);
    const decodeResult = decode(encodeResult.buffer, format) as typeof data;
    expect(encodeResult.size).toBe(52);
    expect(decodeResult.BattVolt.value).toBeCloseTo(data.BattVolt.value);
  });
});
