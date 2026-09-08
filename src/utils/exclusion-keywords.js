import { detectItem } from "../keywods/itemKeywords.js";

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

// NEW: check if the row contains any item keyword
export function rowContainsItem(row) {
  const rowText = row.map(normalizeText).join(" ");
  // detectItem returns the main key when a synonym is found, or null otherwise
  return detectItem(rowText) !== null;
}

export function markExcludedRows(rows) {
  return rows.map((row, index) => ({
    rowNumber: index + 1,
    values: row,
    isExcluded: rowContainsExclusionaryWord(row),
    // NEW: flag item rows
    isItemRow: rowContainsItem(row),
  }));
}
