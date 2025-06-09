import {
  FaMapMarkerAlt,
  FaTrashAlt,
  FaTruck,
  FaShieldAlt,
  FaCalendarAlt,
  FaCreditCard,
} from "react-icons/fa";
import "./Stepper.css";

const steps = [
  { label: "Postcode", icon: <FaMapMarkerAlt /> },
  { label: "Waste Type", icon: <FaTrashAlt /> },
  { label: "Select Skip", icon: <FaTruck /> },
  { label: "Permit Check", icon: <FaShieldAlt /> },
  { label: "Choose Date", icon: <FaCalendarAlt /> },
  { label: "Payment", icon: <FaCreditCard /> },
];

type StepperProps = {
  activeStep: number;
  onStepClick?: (index: number) => void;
};

const Stepper = ({ activeStep, onStepClick }: StepperProps) => {
  return (
    <div className="stepper-container">
      {steps.map(({ label, icon }, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;
        const isClickable = isActive || isCompleted;

        return (
          <div
            key={label}
            className={`step-item ${
              isActive ? "active" : isCompleted ? "previous" : ""
            }`}
            onClick={() => isClickable && onStepClick?.(index)}
            style={{
              cursor: isClickable ? "pointer" : "default",
              pointerEvents: isClickable ? "auto" : "none",
            }}
          >
            <div className="step-icon" title={label}>
              {icon}
            </div>
            <div className="step-label d-none d-md-inline">{label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
