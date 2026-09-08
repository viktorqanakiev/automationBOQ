export const quantityUnitKeywords = [
  {
    key: "м.",
    synonyms: ["м", "m.", "m"],
  },
  {
    key: "бр.",
    synonyms: ["брой", "pcs.", "pcs", "броя"],
  },
];

function normalizeText(text) {
  return String(text ?? "")
    .toLocaleLowerCase("bg-BG")
    .trim()
    .replace(/\s+/g, " ");
}

export function detectQuantityUnit(rowText) {
  const normalized = normalizeText(rowText);

  for (const kw of quantityUnitKeywords) {
    for (const syn of kw.synonyms) {
      const normalizedSyn = normalizeText(syn);
      if (normalized.includes(normalizedSyn)) {
        return kw.key;
      }
    }
  }

  return null;
}
