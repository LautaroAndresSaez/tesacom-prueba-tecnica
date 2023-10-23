export const binaryToHex = (binary: string): string => {
  return binary
    .split("")
    .reduce(createHex, [])
    .map((bin) => parseInt(bin, 2).toString(16))
    .join("");
};

const createHex = (accum: string[], value: string): string[] => {
  if (accum.length === 0) return [value];
  const lastIndex = accum.length - 1;
  if (accum[lastIndex].length === 4) return [...accum, value];
  accum[lastIndex] += value;
  return accum;
};
