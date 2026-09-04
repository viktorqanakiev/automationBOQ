import * as XLSX from "xlsx";
import { markExcludedRows } from "./exclusion-keywords";

export async function readExcelFile(file) {
  if (!(file instanceof File)) {
    throw new Error("A valid Excel file is required.");
  }

  const fileName = file.name.toLowerCase();
  const isExcelFile = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");

  if (!isExcelFile) {
    throw new Error("Only .xlsx and .xls files are supported.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer);
  const sheetNames = workbook.SheetNames;

  if (sheetNames.length === 0) {
    throw new Error("The Excel file does not contain any worksheets.");
  }

  const firstSheetName = sheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rawRows = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: "",
    raw: false,
  });

  return {
    fileName: file.name,
    sheetNames,
    activeSheetName: firstSheetName,
    rows: markExcludedRows(rawRows),
  };
}
