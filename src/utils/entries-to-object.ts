import { Entrie } from "../types/entries";

export const entriesToObject = (entries: Entrie[], obj: any = {}): Object => {
  if (entries.length === 0) return obj;
  const [[rawTags, value], ...restEntries] = entries;
  const tags = rawTags.split(".");
  let subObj = obj;
  tags.forEach((tag, i, array) => {
    subObj[tag] = subObj[tag] || {};
    if (i === array.length - 1) {
      subObj[tag] = value;
      return;
    }
    subObj = subObj[tag];
  });
  return entriesToObject(restEntries, obj);
};
