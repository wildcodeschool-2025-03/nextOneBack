import "../../styles/playerPage.css";
import { useEffect, useState } from "react";
import GameIcone from "../../assets/icones/icone_game.png";
import { playerScore } from "../../services/playerScore";

type Score = {
  party_id: number;
  game_name: string;
  score: number;
  date_game: number;
};
export default function UserCard() {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    playerScore()
      .then(setScores)
      .catch((err) => {
        console.error("Impossible de charger les scores", err);
      });
  }, []);

  return (
    <section className="box-players">
      <h2 className="h2-admin-page">Historiques</h2>
      <span className="barre" />
      <div className="box-players-info">
        <article className="box-icone-game">
          <img className="icone-game" src={GameIcone} alt="icone de pièces" />
        </article>
        <article className="box-historical">
          <ul className="ul-scored">
            {scores.map((score) => (
              <li key={score.party_id}>
                <strong>
                  {new Date(score.date_game).toLocaleDateString()} -{" "}
                </strong>
                <strong>{score.game_name} - </strong>
                <strong> Score : {score.score}</strong>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
