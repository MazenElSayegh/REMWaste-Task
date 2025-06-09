import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Stepper from "./components/Stepper";
import SkipCard from "./components/SkipCard";
import SkipDetailsModal from "./components/SkipDetailsModal";
import type { Skip } from "./types/skip";
import SkipFooter from "./components/SkipFooter";

function App() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStep] = useState(2);

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

  useEffect(() => {
    const handleEvent = (e: any) => setSelectedSkip(e.detail);
    window.addEventListener("select-skip", handleEvent);
    return () => window.removeEventListener("select-skip", handleEvent);
  }, []);

  const handleSelectSkip = (skip: Skip) => {
    setSelectedSkip(skip);
    setShowModal(false);
  };

  const handleClearSelectedSkip = () => {
    setSelectedSkip(null);
  };

  const [modalSkip, setModalSkip] = useState<Skip | null>(null);

  return (
    <div>
      <header className="template-header py-2 shadow-sm">
        <div className="container">
          <h2 className="text-success">#WeWantWaste</h2>
        </div>
      </header>
      <Stepper activeStep={activeStep} />
      <div className="template-wrapper">
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
              <div className="text-center text-warning">
                No skips available.
              </div>
            ) : (
              <div className="row g-4">
                {skips.map((skip) => (
                  <div className="col-md-3" key={skip.id}>
                    <SkipCard
                      skip={skip}
                      selected={selectedSkip?.id === skip.id}
                      imageUrl={getImageBySize(skip.size)}
                      onSelect={handleSelectSkip}
                      onViewDetails={(skip) => {
                        setModalSkip(skip);
                        setShowModal(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <SkipDetailsModal
          show={showModal}
          skip={modalSkip}
          imageUrl={modalSkip ? getImageBySize(modalSkip.size) : ""}
          onClose={() => setShowModal(false)}
        />
      </div>
      <footer className="template-footer mt-3 py-3 text-center text-muted">
        <small>
          © {new Date().getFullYear()} WeWantWaste. All rights reserved.
        </small>
      </footer>
      {selectedSkip && (
        <SkipFooter skip={selectedSkip} onClear={handleClearSelectedSkip} />
      )}
    </div>
  );
}

export default App;
