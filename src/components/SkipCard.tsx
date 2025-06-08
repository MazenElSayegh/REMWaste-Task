import type { Skip } from "../types/skip";

type SkipCardProps = {
  skip: Skip;
  imageUrl: string;
  onSelect?: (skip: Skip) => void;
};

const SkipCard = ({ skip, imageUrl, onSelect }: SkipCardProps) => {
  return (
    <div className="card skip-card h-100 shadow-sm">
      <div className="position-relative">
        <img
          src={imageUrl}
          className="card-img-top p-3 rounded-5 skip-img"
          alt={`${skip.size} yard skip`}
        />
        <span className="badge skip-badge position-absolute top-0 end-0 m-2">
          {skip.size} Yards
        </span>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{skip.size} Yard Skip</h5>
        <h6 className="skip-price mt-auto mb-3">
          £{skip.price_before_vat.toFixed(2)}
        </h6>
        <button
          className="btn skip-button w-100"
          onClick={() => onSelect?.(skip)}
        >
          Select This Skip →
        </button>
      </div>
    </div>
  );
};

export default SkipCard;
