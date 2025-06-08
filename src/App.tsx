import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Stepper from "./components/Stepper";

type Skip = {
  id: number;
  size: number;
  hire_period_days: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  price_before_vat: number;
};

function App() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(2);

  const images = import.meta.glob("./assets/skips/*-yarder-skip.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const getImageBySize = (size: number): string => {
    const match = Object.entries(images).find(([path]) =>
      path.includes(`/${size}-yarder-skip.jpg`)
    );
    return match?.[1] ?? "";
  };

  useEffect(() => {
    async function fetchSkips() {
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        const data: Skip[] = await response.json();
        setSkips(data);
      } catch (error) {
        console.error("Failed to fetch skips:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkips();
  }, []);

  return (
    <div className="template-wrapper">
      <header className="template-header py-2 shadow-sm">
        <div className="container">
          <h2 className="text-success">WeWantWaste</h2>
        </div>
      </header>

      <div className="py-3">
        <Stepper activeStep={activeStep} />
      </div>

      <section className="template-hero py-4">
        <div className="container text-center">
          <h1 className="display-5 text-dark">Choose Your Skip Size</h1>
          <p className="text-muted">
            Eco-friendly skips for your next clean-up project
          </p>
        </div>
      </section>

      <section className="template-content py-3">
        <div className="container">
          {loading ? (
            <div className="text-center text-secondary">Loading skips...</div>
          ) : skips.length === 0 ? (
            <div className="text-center text-warning">No skips available.</div>
          ) : (
            <div className="row g-4">
              {skips.map((skip) => (
                <div className="col-md-4" key={skip.id}>
                  <div className="card skip-card h-100 shadow-sm border-0">
                    <div className="position-relative">
                      <img
                        src={getImageBySize(skip.size)}
                        className="card-img-top p-3"
                        alt={`${skip.size} yard skip`}
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
                      <p className="card-text small text-muted mb-2">
                        {skip.allowed_on_road
                          ? "Allowed on road"
                          : "Not allowed on road"}
                        <br />
                        {skip.allows_heavy_waste
                          ? "Allows heavy waste"
                          : "No heavy waste"}
                      </p>
                      <h6 className="skip-price mt-auto mb-3">
                        £{skip.price_before_vat.toFixed(2)} (ex. VAT)
                      </h6>
                      <button className="btn skip-button w-100">
                        Select This Skip →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="template-footer mt-3 py-3 text-center text-muted">
        <small>
          © {new Date().getFullYear()} WeWantWaste. All rights reserved.
        </small>
      </footer>
    </div>
  );
}

export default App;
