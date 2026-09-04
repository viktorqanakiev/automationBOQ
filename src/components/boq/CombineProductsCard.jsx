import { ChevronRight, Layers3 } from 'lucide-react';

function CombineProductsCard({ disabled, onClick }) {
  return (
    <section className={`process-card secondary-card ${disabled ? 'disabled' : ''}`}>
      <div className="step-heading">
        <div className="step-number">2</div>
        <div>
          <h2>Combine Same Products</h2>
          <p>Group identical products and sum their quantities into one line</p>
        </div>
      </div>

      <button type="button" className="action-button" disabled={disabled} onClick={onClick}>
        <Layers3 size={17} />
        <span>Combine the same products</span>
        <ChevronRight className="button-arrow" size={19} />
      </button>
    </section>
  );
}
export default CombineProductsCard;