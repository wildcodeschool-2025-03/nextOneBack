import { useEffect, useState } from "react";
import "./ArcadeGameCard.css";

interface Game {
  id: number;
  name: string;
  description: string;
  category: string;
  available_online: number;
  available_maintenance: number;
  image: string;
}

interface Props {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (gameId: number) => void;
}

interface RankingEntry {
  username: string;
  score: number;
}

export default function ArcadeGameCard({
  game,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/games/${game.id}/ranking`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setRanking(data))
      .catch((err) =>
        console.error(`Erreur récupération classement du jeu ${game.id}:`, err),
      );
  }, [game.id]);

  const getStatusColor = () => {
    if (game.available_online === 1 && game.available_maintenance === 0)
      return { class: "green", label: "Disponible" };
    if (game.available_online === 0 && game.available_maintenance === 1)
      return { class: "orange", label: "Maintenance" };
    return { class: "red", label: "Indisponible" };
  };

  const status = getStatusColor();

  return (
    <article className="arcade-game-card">
      <div className="game-image-block">
        <img
          src={game.image}
          alt={`Illustration du jeu ${game.name}`}
          className="card-image"
        />
      </div>

      <div className="game-info-block">
        <div className="status-wrapper">
          <span className={`status-indicator ${status.class}`} />
          <span className="status-label">{status.label}</span>
        </div>

        <h3 className="game-title">{game.name}</h3>
        <p className="game-desc">{game.description}</p>

        <button
          type="button"
          className={`favorite-btn ${isFavorite ? "remove" : "add"}`}
          onClick={() => onToggleFavorite(game.id)}
          aria-label={
            isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
          }
        >
          {isFavorite ? "✩ Supprimer aux favoris" : "✩ Ajouter aux favoris"}
        </button>
      </div>

      <div className="game-ranking-block">
        <strong>Classement</strong>
        <ul aria-label={`Classement du jeu ${game.name}`}>
          {ranking.length > 0 ? (
            ranking.map((entry, idx) => {
              const placeIcons = ["🥇", "🥈", "🥉"];
              return (
                <li key={`${entry.username}-${idx}`}>
                  {placeIcons[idx] ?? `${idx + 1}.`} {entry.username} –{" "}
                  {entry.score} pts
                </li>
              );
            })
          ) : (
            <li>Aucun score enregistré</li>
          )}
        </ul>
      </div>
    </article>
  );
}
