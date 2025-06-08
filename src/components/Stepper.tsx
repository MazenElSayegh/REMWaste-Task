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
};

const Stepper = ({ activeStep }: StepperProps) => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isPrevious = index < activeStep;
        const isHighlighted = isActive || isPrevious;

        return (
          <div
            key={index}
            className={`d-flex align-items-center gap-2 ${
              isHighlighted ? "text-success" : "text-muted"
            }`}
          >
            <div>{step.icon}</div>
            <span className={isActive ? "fw-bold" : ""}>{step.label}</span>

            {index < steps.length - 1 && (
              <div
                className={`mx-2 ${
                  isPrevious
                    ? "border-top border-success"
                    : "border-top border-muted"
                }`}
                style={{ width: 30 }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
