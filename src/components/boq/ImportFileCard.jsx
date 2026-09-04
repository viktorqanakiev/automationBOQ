import { FileSpreadsheet, Upload } from 'lucide-react';
import { useRef, useState } from 'react';

function ImportFileCard({ file, onFileSelected }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const selectFile = (selectedFile) => {
    if (!selectedFile) return;

    const validExtensions = ['.xlsx', '.xls'];
    const fileName = selectedFile.name.toLowerCase();
    const isValid = validExtensions.some((extension) => fileName.endsWith(extension));

    if (!isValid) {
      window.alert('Please select an Excel file (.xlsx or .xls).');
      return;
    }

    onFileSelected(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  };

  return (
    <section className="process-card import-card">
      <div className="step-heading">
        <div className="step-number current">1</div>
        <div>
          <h2>Import File</h2>
          <p>Upload an Excel file (.xlsx / .xls) to begin parsing</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden-input"
        onChange={(event) => selectFile(event.target.files?.[0])}
      />

      <button
        type="button"
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          {file ? <FileSpreadsheet size={25} /> : <Upload size={25} />}
        </div>
        <span className="drop-title">
          {file ? file.name : 'Drop your Excel file here or click to upload'}
        </span>
        <span className="drop-subtitle">
          {file ? 'Click to choose a different file' : '.xlsx or .xls · up to 50 MB'}
        </span>
      </button>
    </section>
  );
}

export default ImportFileCard;