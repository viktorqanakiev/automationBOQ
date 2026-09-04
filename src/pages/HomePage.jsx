import { useState } from "react";
import ImportFileCard from "../components/boq/ImportFileCard";
import CombineProductsCard from "../components/boq/CombineProductsCard";
import ReviewDataCard from "../components/boq/ReviewDataCard";
import StatusCard from "../components/boq/StatusCard";
import ReviewPage from "./ReviewPage";
import { readExcelFile } from "../utils/boq-exel-reader";

function HomePage() {
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [error, setError] = useState("");
  const [combined, setCombined] = useState(false);
  const [reviewed, setReviewed] = useState(false);

  const handleFileSelected = async (selectedFile) => {
    setFile(selectedFile);
    setExcelData(null);
    setError("");
    setCombined(false);
    setReviewed(false);

    try {
      const parsedData = await readExcelFile(selectedFile);

      setExcelData(parsedData);
      console.log("Excel file successfully read:", parsedData);
    } catch (readError) {
      setError(readError.message);
      console.error("Error reading Excel file:", readError);
    }
  };

  return (
    <main className="page-shell">
      <div className="page-heading">
        <h1>Import &amp; Process BOQ</h1>
        <p>
          Upload your Bill of Quantities Excel file to get started. Supported
          formats: .xlsx, .xls.
        </p>
      </div>

      <div className="process-list">
        <ImportFileCard file={file} onFileSelected={handleFileSelected} />

        {error && <p className="error-message">{error}</p>}

        {excelData && <ReviewPage parsedRows={excelData.rows} />}

        <CombineProductsCard
          disabled={!excelData}
          onClick={() => setCombined(true)}
        />

        <ReviewDataCard
          disabled={!excelData}
          onClick={() => setReviewed(true)}
        />

        <StatusCard file={file} combined={combined} reviewed={reviewed} />
      </div>
    </main>
  );
}

export default HomePage;
