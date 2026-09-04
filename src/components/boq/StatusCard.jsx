function StatusCard({ file, combined, reviewed }) {
  return (
    <section className="status-card">
      <div className="status-label">STATUS</div>
      {!file ? (
        <p className="status-message">No file imported yet.</p>
      ) : (
        <div className="status-content">
          <p className="status-message">
            File imported: <strong>{file.name}</strong>
          </p>
          <div className="status-pills">
            <span>{combined ? 'Products combined' : 'Ready to process'}</span>
            {reviewed && <span>Review opened</span>}
          </div>
        </div>
      )}
    </section>
  );
}

export default StatusCard;