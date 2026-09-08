export const materialKeywords = [
  {
    key: "PVC",
    synonyms: ["pvc", "пвц"],
  },
  {
    key: "PPR",
    synonyms: ["ppr", "pp-r", "полипропилен"],
  },
  {
    key: "HDPE",
    synonyms: [
      "hdpe",
      "high density polyethylene",
      "полиетилен висока плътност",
    ],
  },
  {
    key: "PE",
    synonyms: ["pe", "полиетилен"],
  },
];

function normalizeText(text) {
  return String(text ?? "")
    .toLocaleLowerCase("bg-BG")
    .trim()
    .replace(/\s+/g, " ");
}

// Detect a single material (first match), checking both key and synonyms
export function detectMaterial(rowText) {
  const normalized = normalizeText(rowText);

  for (const kw of materialKeywords) {
    const termsToCheck = [kw.key, ...kw.synonyms];

    for (const term of termsToCheck) {
      const normalizedTerm = normalizeText(term);

      // Build a regex that matches the term as a whole word
      // \b is a word boundary; "u" flag for Unicode
      const pattern = `\\b${escapeRegExp(normalizedTerm)}\\b`;
      const regex = new RegExp(pattern, "iu");

      if (regex.test(normalized)) {
        return kw.key;
      }
    }
  }

  return null;
}

// Helper to escape special regex characters in the term
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
