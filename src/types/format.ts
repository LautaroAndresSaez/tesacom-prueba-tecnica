import { LenTypes, NoLenTypes } from "./types";

export type Format = FormatItem[];

export type FormatItem = {
  tag: string;
} & (
  | {
      type: LenTypes;
      len: number;
    }
  | { type: NoLenTypes }
);
