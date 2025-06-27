import "./styles/scoreBoard.css";

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

export default function ScoreBoard({ score, highScore }: ScoreBoardProps) {
  return (
    <div className="score-board">
      <div className="score">🎯 Score : {score}</div>
      <div className="high-score">🏆 Meilleur : {highScore}</div>
    </div>
  );
}
