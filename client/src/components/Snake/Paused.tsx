import "./styles/paused.css";

interface PausedProps {
  onResume: () => void;
}

export default function Paused({ onResume }: PausedProps) {
  return (
    <div className="paused-overlay">
      <div className="paused-box">
        <h2>⏸️ Jeu en pause</h2>
        <p>
          Appuie sur <strong>Espace</strong> ou <strong>Entrée</strong> pour
          reprendre
        </p>
        <button
          type="button"
          className="resume-btn"
          onClick={onResume}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onResume();
            }
          }}
        >
          Reprendre
        </button>
      </div>
    </div>
  );
}
