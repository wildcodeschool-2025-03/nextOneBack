import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "../Auth/LoginContext";
import ArcadeGameCard from "../components/LesArcades/ArcadeGameCard";
import "../components/LesArcades/ArcadeGameCard.css";
import "../styles/LesArcadesPage.css";

interface Game {
  id: number;
  name: string;
  description: string;
  category: string;
  available_online: number;
  available_maintenance: number;
  image: string;
}

export default function LesArcadesPage() {
  const context = useContext(LoginContext);
  const user = context?.user;

  const [games, setGames] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filterSolo, setFilterSolo] = useState(false);
  const [filterMulti, setFilterMulti] = useState(false);
  const [abcLetter, setAbcLetter] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/games`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setGames(res.data);
        } else {
          console.error("Réponse inattendue pour /api/games", res.data);
        }
      })
      .catch((err) => {
        console.error("Erreur fetch jeux:", err);
      });

    if (user?.id) {
      axios
        .get(`${apiUrl}/api/favorites/${user.id}`, { withCredentials: true })
        .then((res) => setFavorites(res.data))
        .catch((err) => console.error("Erreur fetch favoris:", err));
    } else {
      setFavorites([]);
    }
  }, [user?.id]);

  const onToggleFavorite = async (gameId: number) => {
    if (!user) {
      alert("Vous devez être connecté pour gérer vos favoris.");
      return;
    }

    const isFav = favorites.includes(gameId);
    try {
      if (isFav) {
        await axios.delete(`${apiUrl}/api/favorites/${user.id}/${gameId}`, {
          withCredentials: true,
        });
        setFavorites(favorites.filter((id) => id !== gameId));
      } else {
        await axios.post(
          `${apiUrl}/api/favorites`,
          { id_user: user.id, id_game: gameId },
          { withCredentials: true },
        );
        setFavorites([...favorites, gameId]);
      }
    } catch (err) {
      console.error("Erreur gestion favori:", err);
    }
  };

  const filteredGames = games
    .filter((g) => {
      const isSolo = g.category.toLowerCase().includes("solo");
      const isMulti = g.category.toLowerCase().includes("multi");
      if (!filterSolo && !filterMulti) return true;
      if (filterSolo && !filterMulti) return isSolo && !isMulti;
      if (!filterSolo && filterMulti) return isMulti;
      return isSolo || isMulti;
    })
    .filter((g) => {
      if (!abcLetter) return true;
      return g.name.toLowerCase().startsWith(abcLetter.toLowerCase());
    });

  const visibleGames = filteredGames.slice(0, visibleCount);

  const loadMore = useCallback(() => {
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
    }, 500);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <main className="arcades-page">
      <div className="block-title">
        <span className="line" />
        <h2>NOS JEUX</h2>
        <span className="line" />
      </div>

      <section className="filters" aria-label="Filtres de recherche">
        <fieldset className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={filterSolo}
              onChange={() => setFilterSolo(!filterSolo)}
            />
            Solo
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterMulti}
              onChange={() => setFilterMulti(!filterMulti)}
            />
            Multijoueur
          </label>
        </fieldset>

        <fieldset className="abc-bar">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <button
              key={letter}
              type="button"
              className={abcLetter === letter ? "active" : ""}
              onClick={() => setAbcLetter(letter === abcLetter ? null : letter)}
              aria-pressed={abcLetter === letter}
            >
              {letter}
            </button>
          ))}
        </fieldset>
      </section>

      <section className="games-grid" aria-label="Liste des jeux disponibles">
        {visibleGames.length === 0 ? (
          <p className="no-games">Aucun jeu trouvé.</p>
        ) : (
          visibleGames.map((game) => (
            <ArcadeGameCard
              key={game.id}
              game={game}
              isFavorite={user ? favorites.includes(game.id) : false}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        )}
      </section>

      <div ref={observerRef} style={{ height: "1px" }} aria-hidden="true" />
    </main>
  );
}
