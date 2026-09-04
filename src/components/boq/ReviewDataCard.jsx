import { ChevronRight, Eye } from 'lucide-react';

function ReviewDataCard({ disabled, onClick }) {
  return (
    <section className={`process-card secondary-card ${disabled ? 'disabled' : ''}`}>
      <div className="step-heading">
        <div className="step-number">3</div>
        <div>
          <h2>Review Parsed Data</h2>
          <p>See what the app read from your BOQ and which lines have no matching products</p>
        </div>
      </div>

      <button type="button" className="action-button" disabled={disabled} onClick={onClick}>
        <Eye size={17} />
        <span>Review parsed data</span>
        <ChevronRight className="button-arrow" size={19} />
      </button>
    </section>
  );
}
export default ReviewDataCard;