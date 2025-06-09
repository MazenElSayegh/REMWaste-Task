import type { Skip } from "../types/skip";
import { Button } from "react-bootstrap";

type Props = {
  skip: Skip;
  onClear: () => void;
};

const SelectedSkipFooter = ({ skip, onClear }: Props) => {
  return (
    <div className="selected-skip-footer shadow-lg p-3 bg-white border-top">
      <p className="small mx-2 text-center">
        Imagery and information shown throughout this website may not reflect
        the exact shape or size specification, colours may vary, options and/or
        accessories may be featured at additional cost.
      </p>
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <p>{skip.size} Yard Skip</p>
          <p className="mx-3 fs-5 skip-price">
            £{skip.price_before_vat.toFixed(2)}
          </p>
          <p>{skip.hire_period_days} day hire</p>
        </div>
        <div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={onClear}
            className="me-2"
          >
            Clear
          </Button>
          <Button variant="success" size="sm">
            Continue →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedSkipFooter;
