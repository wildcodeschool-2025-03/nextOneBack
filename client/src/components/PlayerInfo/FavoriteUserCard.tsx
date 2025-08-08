import "../../styles/playerPage.css";
import { useEffect, useState } from "react";
import { favoriteGame } from "../../services/favoriteGame";

type Favorite = {
  id: number;
  images: string;
  alt: string;
  name: string;
  description: string;
};
export default function FavoriteUserCard() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    favoriteGame()
      .then(setFavorites)
      .catch((err) => {
        console.error("Impossible de charger les favoris", err);
      });
  }, []);
  return (
    <ul className="ul-favorite">
      {favorites.map((favorite) => (
        <div key={favorite.id} className="card-favorite">
          <img
            className="image-favorite"
            src={`${import.meta.env.VITE_API_URL}/assets/images/games/${favorite.images}`}
            alt={favorite.name}
          />
          <h3 className="h3-favorite">{favorite.name}</h3>
          <p>{favorite.description}</p>
        </div>
      ))}
    </ul>
  );
}
