import { detectAllItems } from "../keywods/itemKeywords.js";

export const exclusionaryWords = [
  "изкоп",
  "насип",
  "пясък",
  "извозване",
  "полагане",
  "изграждане",
  "бетон",
  "бетонов",
  "изпитване",
  "дезинфекция",
  "видеозаснемане",
  "натоварване",
  "укрепване",
  "проба",
];
function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/\\s+/g, " ");
}

export function rowContainsExclusionaryWord(row) {
  const rowText = row.map(normalizeText).join(" ");

  return exclusionaryWords.some((word) => {
    const normalizedWord = normalizeText(word);
    return rowText.includes(normalizedWord);
  });
}

export function rowContainsItem(row) {
  const rowText = row.map(normalizeText).join(" ");
  return detectAllItems(rowText).length > 0;
}

// NEW: get all matched item keys as a comma-separated string
export function getItemKeywordsForRow(row) {
  const rowText = row.map(normalizeText).join(" ");
  const matchedKeys = detectAllItems(rowText);
  return matchedKeys.join(", ");
}

export function markExcludedRows(rows) {
  return rows.map((row, index) => {
    const isExcluded = rowContainsExclusionaryWord(row);
    const isItemRow = rowContainsItem(row);
    const itemKeywordsStr = isItemRow ? getItemKeywordsForRow(row) : "";

    return {
      rowNumber: index + 1,
      values: row,
      isExcluded,
      isItemRow,
      // NEW: comma-separated matched keywords (empty if not an item row)
      itemKeywords: itemKeywordsStr,
    };
  });
}
