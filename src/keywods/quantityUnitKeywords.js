export const quantityUnitKeywords = [
  {
    key: "м",
    synonyms: ["м"],
  },
  {
    key: "бр",
    synonyms: ["бр"],
  },
];

function normalizeText(value) {
  return String(value ?? "")
    .toLocaleLowerCase("bg-BG")
    .trim()
    .replace(/\s+/g, " ");
}

/*
  Returns the canonical unit when a cell contains exactly:
  "м" or "бр".

  Examples:
  " м " -> "м"
  "БР" -> "бр"
  "м3" -> null
  "мм" -> null
*/
export function detectQuantityUnit(value) {
  const normalized = normalizeText(value);

  for (const unit of quantityUnitKeywords) {
    const termsToCheck = [unit.key, ...unit.synonyms];

    for (const term of termsToCheck) {
      if (normalized === normalizeText(term)) {
        return unit.key;
      }
    }
  }

  return null;
}

/*
  Checks whether a cell is a number or a number written as text.
  Supports:
  9
  9.00
  9,00
  1 250,50
*/
export function isNumericValue(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return true;
  }

  const normalized = String(value ?? "")
    .trim()
    .replace(/\s/g, "")
    .replace(",", ".");

  if (!normalized) {
    return false;
  }

  return Number.isFinite(Number(normalized));
}

/*
  Finds the first exact "м" or "бр" unit in the row.

  Then:
  1. Finds the first numeric cell to its right.
  2. If there is no numeric cell, uses the immediate next non-empty cell.
  3. If no usable quantity exists, returns an empty quantity.

  Returns:
  { quantityUnit: "м", quantity: "4.10" }
  or
  { quantityUnit: "", quantity: "" }
*/
export function extractQuantityFromRow(row) {
  const unitIndex = row.findIndex((cell) => detectQuantityUnit(cell));

  if (unitIndex === -1) {
    return {
      quantityUnit: "",
      quantity: "",
    };
  }

  const quantityUnit = detectQuantityUnit(row[unitIndex]);

  for (let index = unitIndex + 1; index < row.length; index += 1) {
    const cell = row[index];

    if (isNumericValue(cell)) {
      return {
        quantityUnit,
        quantity: String(cell).trim(),
      };
    }
  }

  const immediateNextCell = row[unitIndex + 1];

  if (
    immediateNextCell !== undefined &&
    immediateNextCell !== null &&
    String(immediateNextCell).trim() !== ""
  ) {
    return {
      quantityUnit,
      quantity: String(immediateNextCell).trim(),
    };
  }

  return {
    quantityUnit,
    quantity: "",
  };
}
