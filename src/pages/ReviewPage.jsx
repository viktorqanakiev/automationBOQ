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
      <h2>Parsed Excel Data</h2>

      <p>
        Rows containing exclusionary words are shown in red. Rows containing
        known item keywords are shown in green.
      </p>

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
