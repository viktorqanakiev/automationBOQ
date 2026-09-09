function escapeCsvValue(value) {
  const text = String(value ?? "");

  // CSV rules:
  // - double quotes inside a value become two double quotes
  // - values containing separators, quotes, or line breaks are wrapped in quotes
  const escapedText = text.replace(/"/g, '""');

  if (
    escapedText.includes(";") ||
    escapedText.includes(",") ||
    escapedText.includes('"') ||
    escapedText.includes("\n") ||
    escapedText.includes("\r")
  ) {
    return `"${escapedText}"`;
  }

  return escapedText;
}

function generateCsvContent(rows) {
  // Semicolon is used because Excel commonly expects it in European locales.
  const separator = ";";

  const header = ["Material", "Item", "Diameter", "Unit", "Quantity"];

  // Export only rows that do NOT contain an exclusionary word.
  const allowedRows = rows.filter((row) => !row.isExcluded);

  const csvRows = allowedRows.map((row) => {
    const values = [
      row.material,
      row.itemKeywords,
      row.diameter,
      row.quantityUnit,
      row.quantity,
    ];

    return values.map(escapeCsvValue).join(separator);
  });

  // BOM helps Excel correctly recognize UTF-8 Bulgarian text.
  return "\uFEFF" + [header.join(separator), ...csvRows].join("\r\n");
}

function downloadCsv(rows) {
  const csvContent = generateCsvContent(rows);

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "boq-export.csv";
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function ReviewPage({ parsedRows }) {
  if (!parsedRows?.length) {
    return (
      <section className="process-card review-card">
        <p>No rows were found in the Excel file.</p>
      </section>
    );
  }

  return (
    <section className="process-card review-card">
      <div className="review-heading">
        <div>
          <h2>Parsed Excel Data</h2>

          <p>
            Rows containing exclusionary words are shown in red. Rows containing
            known item keywords are shown in green.
          </p>
        </div>

        <button
          type="button"
          className="generate-csv-button"
          onClick={() => downloadCsv(parsedRows)}
        >
          Generate CSV
        </button>
      </div>

      <div className="review-table-wrapper">
        <table className="review-table">
          <thead>
            <tr>
              <th className="row-number-cell">#</th>
              <th>Matched item keywords</th>
              <th>Material</th>
              <th>Diameter</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Row data</th>
            </tr>
          </thead>

          <tbody>
            {parsedRows.map((row) => {
              const rowClass = row.isExcluded
                ? "excluded-row"
                : row.isItemRow
                  ? "item-row"
                  : "";

              return (
                <tr key={row.rowNumber} className={rowClass}>
                  <td className="row-number-cell">{row.rowNumber}</td>

                  <td>{row.itemKeywords || "-"}</td>

                  <td>{row.material || "-"}</td>

                  <td>{row.diameter || "-"}</td>

                  <td>{row.quantityUnit || "-"}</td>

                  <td>{row.quantity || "-"}</td>

                  <td>
                    {row.values.map((value, cellIndex) => (
                      <div key={`${row.rowNumber}-${cellIndex}`}>
                        {String(value)}
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ReviewPage;
