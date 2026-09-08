export const materialKeywords = [
  {
    key: "PVC",
    synonyms: ["pvc", "пвц"],
  },
  {
    key: "PPR",
    synonyms: ["ppr", "pp-r", "полипропилен", "ппр"],
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

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  Matches a complete Bulgarian/Latin term, rather than matching a substring
  inside another word (for example, "pe" inside "peshatn").
*/
function containsWholeTerm(text, term) {
  const escapedTerm = escapeRegExp(normalizeText(term));

  const regex = new RegExp(
    `(^|[^a-zа-я0-9])${escapedTerm}($|[^a-zа-я0-9])`,
    "iu",
  );

  return regex.test(text);
}

// Detect the first matching material, checking both key and synonyms.
export function detectMaterial(rowText) {
  const normalized = normalizeText(rowText);

  for (const material of materialKeywords) {
    const termsToCheck = [material.key, ...material.synonyms];

    for (const term of termsToCheck) {
      if (containsWholeTerm(normalized, term)) {
        return material.key;
      }
    }
  }

  return null;
}
