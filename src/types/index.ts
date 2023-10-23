import { Format } from "./format";

export type Encode = (object: any, format: Format) => EncodeResult;

export type EncodeResult = {
  buffer: Buffer;
  size: number;
};

export type Decoder = (buffer: Buffer, format: Format) => any;
