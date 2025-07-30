import { useEffect, useState } from "react";
import "./styles/scoreBoard.css";
import { highScoreSnake } from "../../services/highScoreSnake";

interface ScoreBoardProps {
  score: number;
}
type Score = {
  party_id: number;
  score: number;
};
export default function ScoreBoard({ score }: ScoreBoardProps) {
  const [highScore, setHighScore] = useState<Score[]>([]);

  useEffect(() => {
    highScoreSnake()
      .then(setHighScore)
      .catch((err) => {
        console.error("Impossible de charger les scores", err);
      });
  }, []);
  return (
    <div className="score-board">
      <div className="score">🎯 Score : {score}</div>
      <ul>
        {highScore.map((s) => (
          <li key={s.party_id}>
            <div className="high-score">🏆 Meilleur : {s.score}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
