import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/LoginContext";
import "./ArcadeGameCard.css";

interface Game {
  id: number;
  name: string;
  description: string;
  category: string;
  available_online: number;
  available_maintenance: number;
  images: string;
}

interface Props {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (gameId: number) => void;
  onEdit?: (game: Game) => void;
  onDelete?: (game: Game) => void;
}

interface RankingEntry {
  username: string;
  score: number;
}

const PLACE_ICONS = ["🥇", "🥈", "🥉"];

export default function ArcadeGameCard({
  game,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
}: Props) {
  const { isAdmin } = useContext(AuthContext) ?? {};

  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${apiUrl}/api/games/${game.id}/ranking`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setRanking(data))
      .catch((err) => {
        if (err.name === "AbortError") return;
        if (err.message.includes("404")) return;
        console.error(`Erreur classement jeu ${game.id} :`, err);
      });

    return () => controller.abort();
  }, [game.id]);

  const getStatus = () => {
    if (game.available_online === 1 && game.available_maintenance === 0)
      return { class: "green", label: "Disponible" };
    if (game.available_online === 0 && game.available_maintenance === 1)
      return { class: "orange", label: "Maintenance" };
    return { class: "red", label: "Indisponible" };
  };

  const status = getStatus();
  const imageSrc = `${apiUrl}/assets/images/games/${game.images}`;

  return (
    <article className="arcade-game-card">
      <div className="game-image-block">
        <img
          src={imageSrc}
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

        <div className="actions-row">
          <div className="left-actions">
            <button
              type="button"
              className={`favorite-btn ${isFavorite ? "remove" : "add"}`}
              onClick={() => onToggleFavorite(game.id)}
              aria-label={
                isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
              }
            >
              {isFavorite ? "✩ Supprimer des favoris" : "✩ Ajouter aux favoris"}
            </button>
          </div>

          {isAdmin && (
            <div className="right-actions admin-actions">
              <button
                type="button"
                className="edit-btn"
                onClick={() => onEdit?.(game)}
                aria-label="Modifier ce jeu"
              >
                ✏️ Modifier
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => onDelete?.(game)}
                aria-label="Supprimer ce jeu"
              >
                🗑️ Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="game-ranking-block">
        <strong>Classement</strong>
        <ul aria-label={`Classement du jeu ${game.name}`}>
          {ranking.length > 0 ? (
            ranking.map((entry, idx) => (
              <li key={`${entry.username}-${idx}`}>
                {PLACE_ICONS[idx] ?? `${idx + 1}.`} {entry.username} –{" "}
                {entry.score} pts
              </li>
            ))
          ) : (
            <li>Aucun score enregistré</li>
          )}
        </ul>
      </div>
    </article>
  );
}
