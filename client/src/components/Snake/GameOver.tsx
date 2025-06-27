import "./styles/gameOver.css";

interface GameOverProps {
  onRestart: () => void;
}

export default function GameOver({ onRestart }: GameOverProps) {
  // Écoute la touche R ou Entrée
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key.toLowerCase() === "r") {
      onRestart();
    }
  };

  return (
    <div className="game-over-overlay">
      <div className="game-over-box">
        <h2>💀 Game Over</h2>
        <p>Tu t'es mangé toi-même !</p>
        <button
          type="button"
          className="restart-btn"
          onClick={onRestart}
          onKeyDown={handleKeyDown}
        >
          Rejouer
        </button>
      </div>
    </div>
  );
}
