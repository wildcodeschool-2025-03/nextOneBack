import { useEffect } from "react";
import "./styles/gameOver.css";

interface GameOverProps {
  onRestart: () => void;
}

export default function GameOver({ onRestart }: GameOverProps) {
  // Ajoute un écouteur clavier global
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onRestart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRestart]);

  return (
    <div className="game-over-overlay">
      <div className="game-over-box">
        <h2>💀 Game Over</h2>
        <p>Tu t'es mangé toi-même !</p>
        <button type="button" className="restart-btn" onClick={onRestart}>
          Rejouer
        </button>
      </div>
    </div>
  );
}
