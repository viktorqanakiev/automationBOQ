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

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  Matches a full term without matching it inside another word.
  The letters range includes Bulgarian Cyrillic, Latin letters, and numbers.
*/
function containsWholeTerm(text, term) {
  const escapedTerm = escapeRegExp(normalizeText(term));
  const regex = new RegExp(
    `(^|[^a-zа-я0-9])${escapedTerm}($|[^a-zа-я0-9])`,
    "iu",
  );

  return regex.test(text);
}

// Detect a single item: returns the first matched canonical key, otherwise null.
export function detectItem(rowText) {
  const normalized = normalizeText(rowText);

  for (const kw of itemKeywords) {
    const termsToCheck = [kw.key, ...kw.synonyms];

    for (const term of termsToCheck) {
      if (containsWholeTerm(normalized, term)) {
        return kw.key;
      }
    }
  }

  return null;
}

// Return every matched canonical item key in the row.
export function detectAllItems(rowText) {
  const normalized = normalizeText(rowText);

  return itemKeywords
    .filter((kw) => {
      const termsToCheck = [kw.key, ...kw.synonyms];

      return termsToCheck.some((term) => containsWholeTerm(normalized, term));
    })
    .map((kw) => kw.key);
}
