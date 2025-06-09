import { Modal, Button } from "react-bootstrap";
import "./SkipDetailsModal.css";
import type { Skip } from "../../types/skip";

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
      <Modal.Header closeButton className="template-background">
        <Modal.Title>{skip.size} Yard Skip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={imageUrl} alt="Skip" className="img-fluid mb-3 rounded" />
        <div className="d-flex justify-content-between mb-1 modal-details">
          <div>
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
              <strong>Post code:</strong> {skip.postcode}
            </p>
          </div>
          <div>
            <p>
              <strong>Price:</strong> £{skip.price_before_vat.toFixed(2)}
            </p>
            <p>
              <strong>VAT:</strong> £{skip.vat?.toFixed(2)}
            </p>
            <p>
              <strong>Transport Cost:</strong> £
              {skip.transport_cost?.toFixed(2) ?? 0}
            </p>
            <p>
              <strong>Cost per ton:</strong> £
              {skip.per_tonne_cost?.toFixed(2) ?? 0}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="template-background">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={() => {
            onClose();
            const event = new CustomEvent("select-skip", { detail: skip });
            window.dispatchEvent(event);
          }}
        >
          Select This Skip
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SkipDetailsModal;
