// components/SkipDetailsModal.tsx
import { Modal, Button } from "react-bootstrap";
import type { Skip } from "../types/skip";

type SkipDetailsModalProps = {
  show: boolean;
  skip: Skip | null;
  imageUrl: string;
  onClose: () => void;
};

const SkipDetailsModal = ({
  show,
  skip,
  imageUrl,
  onClose,
}: SkipDetailsModalProps) => {
  if (!skip) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{skip.size} Yard Skip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={imageUrl} alt="Skip" className="img-fluid mb-3 rounded" />
        <p>
          <strong>Hire Period:</strong> {skip.hire_period_days} days
        </p>
        <p>
          <strong>On Road:</strong>{" "}
          {skip.allowed_on_road ? "Allowed" : "Not allowed"}
        </p>
        <p>
          <strong>Heavy Waste:</strong>{" "}
          {skip.allows_heavy_waste ? "Allowed" : "Not allowed"}
        </p>
        <p>
          <strong>Price (ex. VAT):</strong> £{skip.price_before_vat.toFixed(2)}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={() => alert("Skip selected!")}>
          Select This Skip
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SkipDetailsModal;
