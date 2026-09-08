export const itemKeywords = [
  {
    key: "тръба",
    synonyms: ["pipe", "PIPE", "тръби", "тръбопровод"],
  },
  {
    key: "коляно",
    synonyms: ["ъгъл", "ъгли", "колена"],
  },
  {
    key: "дъга",
    synonyms: ["коляно на 45 градуса", "дъги"],
  },
  {
    key: "муфа",
    synonyms: ["socket", "SOCKET", "муфи"],
  },
  {
    key: "редукция",
    synonyms: ["reduction", "редукции", "преход", "преходи", "преходна муфа"],
  },
  {
    key: "тройник",
    synonyms: ["тедка", "тештик", "разклонение на 90 градуса"],
  },

  {
    key: "нипел",
    synonyms: [],
  },

  {
    key: "тапа",
    synonyms: [],
  },

  {
    key: "изолация",
    synonyms: ["топлоизолация", "изолационен материал"],
  },
];

function normalizeText(text) {
  return String(text ?? "")
    .toLocaleLowerCase("bg-BG")
    .trim()
    .replace(/\s+/g, " ");
}

// UPDATED: now checks both main key and synonyms
// export function detectItem(rowText) {
//   const normalized = normalizeText(rowText);

//   for (const kw of itemKeywords) {
//     const termsToCheck = [kw.key, ...kw.synonyms];

//     for (const term of termsToCheck) {
//       const normalizedTerm = normalizeText(term);

//       if (normalized.includes(normalizedTerm)) {
//         return kw.key;
//       }
//     }
//   }

//   return null;
// }

// Return all matched keys for a row as an array
export function detectAllItems(rowText) {
  const normalized = normalizeText(rowText);
  const matchedKeys = [];

  for (const kw of itemKeywords) {
    let matched = false;

    // Check main key
    if (normalized.includes(normalizeText(kw.key))) {
      matched = true;
    }

    // Check synonyms
    if (!matched) {
      for (const syn of kw.synonyms) {
        const normalizedSyn = normalizeText(syn);
        if (normalized.includes(normalizedSyn)) {
          matched = true;
          break;
        }
      }
    }

    if (matched) {
      matchedKeys.push(kw.key);
    }
  }

  return matchedKeys;
}
