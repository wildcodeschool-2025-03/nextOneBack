import axios from "axios";
import type { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Auth/LoginContext";
import ArcadeGameCard from "../components/LesArcades/ArcadeGameCard";
import ConfirmDeleteToast from "../components/LesArcades/ConfirmDeleteToast";
import GameFormModal from "../components/LesArcades/GameFormModal";

import "../components/LesArcades/ArcadeGameCard.css";
import "../styles/LesArcadesPage.css";

interface Game {
  id: number;
  name: string;
  description: string;
  category: string;
  available_online: number;
  available_maintenance: number;
  images: string;
}

export default function LesArcadesPage() {
  const { user, isAdmin } = useContext(AuthContext) ?? {};
  const apiUrl = import.meta.env.VITE_API_URL;

  const [games, setGames] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filterSolo, setFilterSolo] = useState(false);
  const [filterMulti, setFilterMulti] = useState(false);
  const [abcLetter, setAbcLetter] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editGame, setEditGame] = useState<Game | null>(null);
  const [deleteGame, setDeleteGame] = useState<Game | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Fetch jeux + favoris
  useEffect(() => {
    const fetchGamesAndFavorites = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/games`);
        if (Array.isArray(data)) setGames(data);
        else console.error("Réponse inattendue pour /api/games :", data);

        if (user?.id) {
          const favRes = await axios.get(`${apiUrl}/api/favorites/${user.id}`, {
            withCredentials: true,
          });
          setFavorites(favRes.data);
        } else {
          setFavorites([]);
        }
      } catch (err) {
        console.error("Erreur lors du chargement initial :", err);
      }
    };

    fetchGamesAndFavorites();
  }, [user?.id]);

  const onToggleFavorite = async (gameId: number) => {
    if (!user) return alert("Vous devez être connecté pour gérer vos favoris.");

    const isFav = favorites.includes(gameId);
    try {
      if (isFav) {
        await axios.delete(`${apiUrl}/api/favorites/${user.id}/${gameId}`, {
          withCredentials: true,
        });
        setFavorites((prev) => prev.filter((id) => id !== gameId));
      } else {
        await axios.post(
          `${apiUrl}/api/favorites`,
          { id_user: user.id, id_game: gameId },
          { withCredentials: true },
        );
        setFavorites((prev) => [...prev, gameId]);
      }
    } catch (err) {
      console.error("Erreur lors de la gestion du favori :", err);
    }
  };

  const handleAddGame = async (formData: FormData) => {
    try {
      const { data } = await axios.post(`${apiUrl}/api/games`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setGames((prev) => [...prev, data]);
      toast.success("Jeu ajouté avec succès !");
      setShowAddModal(false);
    } catch (err) {
      console.error("Erreur lors de l'ajout du jeu :", err);
      toast.error("Erreur lors de l'ajout du jeu.");
    }
  };

  const handleEditGame = async (formData: FormData) => {
    try {
      const id = formData.get("id");
      const { data } = await axios.put(`${apiUrl}/api/games/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setGames((prev) => prev.map((g) => (g.id === data.id ? data : g)));
      toast.success("Jeu modifié avec succès !");
      setEditGame(null);
    } catch (err) {
      console.error("Erreur lors de la modification du jeu :", err);
      toast.error("Erreur lors de la modification.");
    }
  };

  const handleDeleteGame = async () => {
    if (!deleteGame) return;

    try {
      await axios.delete(`${apiUrl}/api/games/${deleteGame.id}`, {
        withCredentials: true,
      });

      toast.success("Jeu supprimé avec succès !");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response?.status === 404) {
        toast.info("Le jeu était déjà supprimé.");
      } else {
        toast.error("Erreur lors de la suppression.");
        console.error("Erreur lors de la suppression :", err);
      }
    } finally {
      setGames((prev) => prev.filter((g) => g.id !== deleteGame.id));
      setDeleteGame(null);
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
    .filter((g) =>
      abcLetter
        ? g.name.toLowerCase().startsWith(abcLetter.toLowerCase())
        : true,
    );

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
              onEdit={() => setEditGame(game)}
              onDelete={() => setDeleteGame(game)}
            />
          ))
        )}
      </section>

      {isAdmin && (
        <>
          <button
            className="add-game-btn"
            type="button"
            onClick={() => setShowAddModal(true)}
          >
            + Ajouter un jeu
          </button>

          {showAddModal && (
            <GameFormModal
              mode="add"
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAddGame}
            />
          )}

          {editGame && (
            <GameFormModal
              mode="edit"
              onClose={() => setEditGame(null)}
              onSubmit={handleEditGame}
              initialData={{
                id: editGame.id,
                name: editGame.name,
                description: editGame.description,
                images: editGame.images,
                available_online: editGame.available_online,
                available_maintenance: editGame.available_maintenance,
                category: editGame.category,
              }}
            />
          )}

          {deleteGame && (
            <ConfirmDeleteToast
              onCancel={() => setDeleteGame(null)}
              onConfirm={handleDeleteGame}
            />
          )}
        </>
      )}

      <div ref={observerRef} style={{ height: "1px" }} aria-hidden="true" />
    </main>
  );
}
