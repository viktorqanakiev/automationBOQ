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
    key: "PE",
    synonyms: ["pe", "полиетилен"],
  },
  {
    key: "HDPE",
    synonyms: [
      "hdpe",
      "high density polyethylene",
      "полиетилен висока плътност",
    ],
  },
];

function normalizeText(text) {
  return String(text ?? "")
    .toLocaleLowerCase("bg-BG")
    .trim()
    .replace(/\s+/g, " ");
}

export function detectMaterial(rowText) {
  const normalized = normalizeText(rowText);

  for (const kw of materialKeywords) {
    for (const syn of kw.synonyms) {
      const normalizedSyn = normalizeText(syn);
      if (normalized.includes(normalizedSyn)) {
        return kw.key;
      }
    }
  }

  return null;
}
