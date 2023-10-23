import { decode, encode } from ".";
import { ASCII_LENGTH, BYTE_LENGTH } from "./constants";
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

  it("should encode mixed values and generate minimun buffer size", () => {
    const format: Format = [
      { tag: "v0", type: "uint", len: 2 },
      { tag: "v1", type: "int", len: 4 },
      { tag: "v2", type: "ascii" },
      { tag: "v3", type: "float" },
    ];
    const data = {
      v0: 3,
      v1: -1,
      v2: "Temp sensor is broken",
      v3: Math.PI,
    };

    const bitsLength = 38 + (data.v2.length + 2) * ASCII_LENGTH;
    const { size, buffer } = encode(data, format);
    expect(buffer.byteLength).toBe(Math.ceil(bitsLength / BYTE_LENGTH));
    expect(size).toBe(bitsLength);
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

  it("should decode buffer with ascii", () => {
    const format: Format = [
      { tag: "v0", type: "uint", len: 2 },
      { tag: "v1", type: "int", len: 4 },
      { tag: "v2", type: "ascii" },
    ];
    const buffer = Buffer.from(
      "fea65dbc1073cbbb9efe4834f3418b96fd79772360",
      "hex"
    );
    const expectedResult = {
      v0: 3,
      v1: -1,
      v2: "Temp sensor is broken",
    };
    const result = decode(buffer, format) as typeof expectedResult;
    expect(result.v0).toBe(expectedResult.v0);
    expect(result.v1).toBe(expectedResult.v1);
    expect(result.v2.substring(0, expectedResult.v2.length)).toBe(
      expectedResult.v2
    );
  });
});
