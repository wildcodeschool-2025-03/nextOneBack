import { useEffect } from "react";
import "./ConfirmDeleteToast.css";

interface ConfirmDeleteToastProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteToast({
  onConfirm,
  onCancel,
}: ConfirmDeleteToastProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  return (
    <div
      className="toast-overlay"
      aria-modal="true"
      aria-labelledby="toast-title"
    >
      <div className="toast-box">
        <h3 id="toast-title" className="toast-title">
          ⚠️ Confirmation
        </h3>
        <p className="toast-text">Confirmer la suppression du jeu ?</p>
        <div className="toast-buttons">
          <button type="button" className="btn cancel" onClick={onCancel}>
            Annuler
          </button>
          <button type="button" className="btn confirm" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
