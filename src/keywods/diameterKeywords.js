export const diameterKeywords = [
  // DN series (metric nominal diameter)
  {
    key: "DN15",
    synonyms: ["dn15", "dn 15", "15 mm", "f15", "ø15", "15мм", "ф15"],
  },
  {
    key: "DN20",
    synonyms: ["dn20", "dn 20", "20 mm", "f20", "ø20", "20мм", "ф20"],
  },
  {
    key: "DN25",
    synonyms: ["dn25", "dn 25", "25 mm", "f25", "ø25", "25мм", "ф25"],
  },
  {
    key: "DN32",
    synonyms: ["dn32", "dn 32", "32 mm", "f32", "ø32", "32мм", "ф32"],
  },
  {
    key: "DN40",
    synonyms: ["dn40", "dn 40", "40 mm", "f40", "ø40", "40мм", "ф40"],
  },
  {
    key: "DN50",
    synonyms: ["dn50", "dn 50", "50 mm", "f50", "ø50", "50мм", "ф50"],
  },
  {
    key: "DN65",
    synonyms: ["dn65", "dn 65", "65 mm", "f65", "ø65", "65мм", "ф65"],
  },
  {
    key: "DN80",
    synonyms: ["dn80", "dn 80", "80 mm", "f80", "ø80", "80мм", "ф80"],
  },
  {
    key: "DN100",
    synonyms: ["dn100", "dn 100", "100 mm", "f100", "ø100", "100мм", "ф100"],
  },
  {
    key: "DN125",
    synonyms: ["dn125", "dn 125", "125 mm", "f125", "ø125", "125мм", "ф125"],
  },
  {
    key: "DN150",
    synonyms: ["dn150", "dn 150", "150 mm", "f150", "ø150", "150мм", "ф150"],
  },
  {
    key: "DN200",
    synonyms: ["dn200", "dn 200", "200 mm", "f200", "ø200", "200мм", "ф200"],
  },

  // Additional ф20–ф90 series (explicit entries with Cyrillic Ф)
  {
    key: "Ф20",
    synonyms: ["f20", "ф20", "ø20", "20 mm", "20мм"],
  },
  {
    key: "Ф25",
    synonyms: ["f25", "ф25", "ø25", "25 mm", "25мм"],
  },
  {
    key: "Ф32",
    synonyms: ["f32", "ф32", "ø32", "32 mm", "32мм"],
  },
  {
    key: "Ф40",
    synonyms: ["f40", "ф40", "ø40", "40 mm", "40мм"],
  },
  {
    key: "Ф50",
    synonyms: ["f50", "ф50", "ø50", "50 mm", "50мм"],
  },
  {
    key: "Ф63",
    synonyms: ["f63", "ф63", "ø63", "63 mm", "63мм"],
  },
  {
    key: "Ф75",
    synonyms: ["f75", "ф75", "ø75", "75 mm", "75мм"],
  },
  {
    key: "Ф90",
    synonyms: ["f90", "ф90", "ø90", "90 mm", "90мм"],
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
    .replace(/“/g, " цол ");
}

export function detectDiameter(rowText) {
  const normalized = normalizeText(rowText);

  for (const kw of diameterKeywords) {
    for (const syn of kw.synonyms) {
      const normalizedSyn = normalizeText(syn);
      if (normalized.includes(normalizedSyn)) {
        return kw.key;
      }
    }
  }

  return null;
}
