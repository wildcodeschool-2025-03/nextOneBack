import { useEffect, useState } from "react";
import CoinIcone from "../../assets/icones/coin.png";
import GameIcone from "../../assets/icones/icone_game.png";
import "../../styles/adminPage.css";
import UserCount from "./UserCount";

export default function PlayerCard() {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    const countUser = async () => {
      const count = await UserCount();
      setUserCount(count);
    };
    countUser();
  }, []);
  return (
    <section className="box-player">
      <div className="icone-player">
        <img className="icone-game" src={GameIcone} alt="icone de pièces" />
        <img
          className="icone-game"
          src={CoinIcone}
          alt="icone d'un stick de jeu"
        />
      </div>
      <div className="player-text">
        <p className="text-player">Joueurs inscrits :</p>
        <p className="text-player">
          {userCount !== null ? userCount : "Chargement..."}
        </p>
        <p className="text-player">Joueur connectés :</p>
        <p className="text-player">20</p>
      </div>
    </section>
  );
}
