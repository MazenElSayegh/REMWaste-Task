import {
  FaMapMarkerAlt,
  FaTrashAlt,
  FaTruck,
  FaShieldAlt,
  FaCalendarAlt,
  FaCreditCard,
} from "react-icons/fa";

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
  onStepClick?: (stepIndex: number) => void;
};

const Stepper = ({ activeStep, onStepClick }: StepperProps) => {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isPrevious = index < activeStep;
        const isClickable = isPrevious || isActive;

        const handleClick = () => {
          if (isClickable && onStepClick) {
            onStepClick(index);
          }
        };

        return (
          <div
            key={index}
            className={`step-item ${
              isActive ? "active" : isPrevious ? "previous" : ""
            }`}
            onClick={handleClick}
            style={{
              cursor: isClickable ? "pointer" : "default",
              pointerEvents: isClickable ? "auto" : "none",
            }}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-label d-none d-md-inline">{step.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
