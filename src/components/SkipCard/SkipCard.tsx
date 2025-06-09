import type { Skip } from "../../types/skip";
import "./SkipCard.css";

type SkipCardProps = {
  skip: Skip;
  imageUrl: string;
  selected: boolean;
  onSelect?: (skip: Skip) => void;
  onViewDetails?: (skip: Skip) => void;
};

const SkipCard = ({
  skip,
  imageUrl,
  selected,
  onSelect,
  onViewDetails,
}: SkipCardProps) => {
  return (
    <div
      className={`card skip-card h-100 shadow-sm d-flex flex-column ${
        selected ? "selected-skip" : ""
      }`}
    >
      <div
        className="skip-card-details flex-grow-1 cursor-pointer"
        onClick={() => onViewDetails?.(skip)}
      >
        <div className="position-relative">
          <img
            src={imageUrl}
            className="card-img-top p-3 rounded-5"
            alt={`${skip.size} yard skip`}
            style={{ height: "180px", objectFit: "contain" }}
          />
          <span className="badge skip-badge position-absolute top-0 end-0 m-2">
            {skip.size} Yards
          </span>
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{skip.size} Yard Skip</h5>
          <p className="card-text small text-muted mb-1">
            {skip.hire_period_days}-day hire period
          </p>
          <h6 className="skip-price mb-1">
            £{skip.price_before_vat.toFixed(2)} (ex. VAT)
          </h6>
          <p className="text-success small mt-auto mb-0">More details →</p>
        </div>
      </div>

      <div className="p-3 pt-0">
        <button
          className="btn skip-button w-100"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering details
            onSelect?.(skip);
          }}
        >
          Select This Skip →
        </button>
      </div>
    </div>
  );
};

export default SkipCard;
