import { useState } from "react";

export function HalalShield3D() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="halal-shield-stage">
      <button
        className="static-shield"
        type="button"
        aria-label="Show how Amanah connects identity, evidence and custody"
        aria-controls="shield-meaning"
        aria-expanded={revealed}
        onClick={() => setRevealed(value => !value)}
      >
        <img src="media/ghscl-shield.webp" alt="" />
      </button>
      <p id="shield-meaning" className="shield-caption" aria-live="polite">
        {revealed
          ? "One product identity connects its evidence and custody at every handoff."
          : "Select the Amanah crest to see how identity, evidence and custody stay connected."}
      </p>
    </div>
  );
}
