import { detectAllItems } from "../keywods/itemKeywords.js";
import { detectMaterial } from "../keywods/materialKeywords.js";
import { detectAllDiameters } from "../keywods/diameterKeywords.js";
import { extractQuantityFromRow } from "../keywods/quantityUnitKeywords.js";

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
    const rowText = row.map(normalizeText).join(" ");

    const isExcluded = rowContainsExclusionaryWord(row);

    const matchedItemKeywords = detectAllItems(rowText);
    const isItemRow = matchedItemKeywords.length > 0;

    const itemKeywordsStr = matchedItemKeywords.join(", ");

    const material = detectMaterial(rowText) || "";

    const matchedDiameters = detectAllDiameters(rowText);
    const diameterStr = matchedDiameters.join(", ");

    const { quantityUnit, quantity } = extractQuantityFromRow(row);

    return {
      rowNumber: index + 1,
      values: row,

      isExcluded,
      isItemRow,

      itemKeywords: itemKeywordsStr,
      material,
      diameter: diameterStr,

      quantityUnit,
      quantity,
    };
  });
}
