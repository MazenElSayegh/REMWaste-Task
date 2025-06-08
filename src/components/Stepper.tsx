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
    <div className="py-3">
      <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isPrevious = index < activeStep;
          const isClickable = isPrevious || isActive;

          const textClass = isActive
            ? "text-success"
            : isPrevious
            ? "text-success opacity-80"
            : "text-muted opacity-80";

          const connectorClass =
            isPrevious || isActive
              ? "border-top border-success opacity-70"
              : "border-top border-muted opacity-70";

          const handleClick = () => {
            if (isClickable && onStepClick) {
              onStepClick(index);
            }
          };

          return (
            <div
              key={index}
              className={`d-flex align-items-center gap-2 ${textClass}`}
              style={{
                cursor: isClickable ? "pointer" : "default",
                pointerEvents: isClickable ? "auto" : "none",
              }}
              onClick={handleClick}
            >
              <div>{step.icon}</div>
              <span className={isActive ? "fw-bold" : ""}>{step.label}</span>

              {index < steps.length - 1 && (
                <div
                  className={`mx-2 ${connectorClass}`}
                  style={{ width: 30 }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
