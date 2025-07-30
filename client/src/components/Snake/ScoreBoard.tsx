import { useEffect, useState } from "react";
import "./styles/scoreBoard.css";
import { gameScore } from "../../services/gameScore";

interface ScoreBoardProps {
  score: number;
  gameId: number;
}
type Score = {
  score: number;
};
export default function ScoreBoard({ score, gameId }: ScoreBoardProps) {
  const [highScore, setHighScore] = useState<Score>();

  useEffect(() => {
    gameScore(gameId)
      .then(setHighScore)
      .catch((err) => {
        console.error("Impossible de charger les scores", err);
      });
  }, [gameId]);
  return (
    <div className="score-board">
      <div className="score">🎯 Score : {score}</div>
      <ul>
        {highScore && (
          <li className="high-score">🏆 Meilleur : {highScore.score}</li>
        )}
      </ul>
    </div>
  );
}
