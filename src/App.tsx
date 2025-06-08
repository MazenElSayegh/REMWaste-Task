import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Stepper from "./components/Stepper";
import SkipCard from "./components/SkipCard";
import SkipDetailsModal from "./components/SkipDetailsModal";
import type { Skip } from "./types/skip";

function App() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(2);

  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleSelectSkip = (skip: Skip) => {
    setSelectedSkip(skip);
    setShowModal(true);
  };

  return (
    <div className="template-wrapper">
      <header className="template-header py-2 shadow-sm">
        <div className="container">
          <h2 className="text-success">#WeWantWaste</h2>
        </div>
      </header>

      <Stepper activeStep={activeStep} />

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
                <div className="col-md-3" key={skip.id}>
                  <SkipCard
                    skip={skip}
                    imageUrl={getImageBySize(skip.size)}
                    onSelect={handleSelectSkip}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <SkipDetailsModal
        show={showModal}
        skip={selectedSkip}
        imageUrl={selectedSkip ? getImageBySize(selectedSkip.size) : ""}
        onClose={() => setShowModal(false)}
      />

      <footer className="template-footer mt-3 py-3 text-center text-muted">
        <small>
          © {new Date().getFullYear()} WeWantWaste. All rights reserved.
        </small>
      </footer>
    </div>
  );
}

export default App;
