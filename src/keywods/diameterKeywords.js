export const diameterKeywords = [
  // DN series (metric nominal diameter)
  {
    key: "DN15",
    synonyms: ["dn15", "dn 15", "15 mm"],
  },
  {
    key: "DN20",
    synonyms: ["dn20", "dn 20", "20 mm"],
  },
  {
    key: "DN25",
    synonyms: ["dn25", "dn 25", "25 mm"],
  },
  {
    key: "DN32",
    synonyms: ["dn32", "dn 32", "32 mm"],
  },
  {
    key: "DN40",
    synonyms: ["dn40", "dn 40", "40 mm"],
  },
  {
    key: "DN50",
    synonyms: ["dn50", "dn 50", "50 mm"],
  },
  {
    key: "DN65",
    synonyms: ["dn65", "dn 65", "65 mm"],
  },
  {
    key: "DN80",
    synonyms: ["dn80", "dn 80", "80 mm"],
  },
  {
    key: "DN100",
    synonyms: ["dn100", "dn 100", "100 mm"],
  },
  {
    key: "DN125",
    synonyms: ["dn125", "dn 125", "125 mm"],
  },
  {
    key: "DN150",
    synonyms: ["dn150", "dn 150", "150 mm"],
  },
  {
    key: "DN200",
    synonyms: ["dn200", "dn 200", "200 mm"],
  },

  // Additional ф20–ф90 series (explicit entries with Cyrillic Ф)
  {
    key: "Ф20",
    synonyms: ["f20", "ф20", "ø20"],
  },
  {
    key: "Ф25",
    synonyms: ["f25", "ф25", "ø25"],
  },
  {
    key: "Ф32",
    synonyms: ["f32", "ф32", "ø32"],
  },
  {
    key: "Ф40",
    synonyms: ["f40", "ф40", "ø40"],
  },
  {
    key: "Ф50",
    synonyms: ["f50", "ф50", "ø50"],
  },
  {
    key: "Ф63",
    synonyms: ["f63", "ф63", "ø63"],
  },
  {
    key: "Ф75",
    synonyms: ["f75", "ф75", "ø75"],
  },
  {
    key: "Ф90",
    synonyms: ["f90", "ф90", "ø90"],
  },

  // Inch-based sizes using " symbol and "цол"
  {
    key: '1/2"',
    synonyms: ['1/2"', "1/2 цол", '0.5"', "0.5 цол"],
  },
  {
    key: '3/4"',
    synonyms: ['3/4"', "3/4 цол", '0.75"', "0.75 цол"],
  },
  {
    key: '1"',
    synonyms: ['1"', "1 цол", "1“", "1″"],
  },
  {
    key: '1 1/4"',
    synonyms: ['1 1/4"', "1 1/4 цол", '1.25"', "1.25 цол"],
  },
  {
    key: '1 1/2"',
    synonyms: ['1 1/2"', "1 1/2 цол", '1.5"', "1.5 цол"],
  },
  {
    key: '2"',
    synonyms: ['2"', "2 цол", "2“", "2″"],
  },
  {
    key: '2 1/2"',
    synonyms: ['2 1/2"', "2 1/2 цол", '2.5"', "2.5 цол"],
  },
  {
    key: '3"',
    synonyms: ['3"', "3 цол", "3“", "3″"],
  },
  {
    key: '4"',
    synonyms: ['4"', "4 цол", "4“", "4″"],
  },
  {
    key: '6"',
    synonyms: ['6"', "6 цол", "6“", "6″"],
  },
  {
    key: '8"',
    synonyms: ['8"', "8 цол", "8“", "8″"],
  },
  {
    key: '10"',
    synonyms: ['10"', "10 цол", "10“", "10″"],
  },
];

function normalizeText(text) {
  return String(text ?? "")
    .toLocaleLowerCase("bg-BG")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/°/g, " deg")
    .replace(/"/g, " цол ")
    .replace(/″/g, " цол ")
    .replace(/"/g, " цол ");
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  Matches a complete Bulgarian/Latin term, rather than matching a substring
  inside another word.
*/
function containsWholeTerm(text, term) {
  const escapedTerm = escapeRegExp(normalizeText(term));

  const regex = new RegExp(
    `(^|[^a-zа-я0-9])${escapedTerm}($|[^a-zа-я0-9])`,
    "iu",
  );

  return regex.test(text);
}

// Detect ALL diameters in the row, checking both keys and synonyms.
export function detectAllDiameters(rowText) {
  const normalized = normalizeText(rowText);

  return diameterKeywords
    .filter((d) => {
      const termsToCheck = [d.key, ...d.synonyms];
      return termsToCheck.some((term) => containsWholeTerm(normalized, term));
    })
    .map((d) => d.key);
}
