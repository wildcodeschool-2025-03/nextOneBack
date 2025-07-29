import CoinIcone from "../../assets/icones/coin.png";
import GameIcone from "../../assets/icones/icone_game.png";
import SimpleNumberStat from "../stats/SimpleNumberStat";
import "../../styles/adminPage.css";

export default function PlayerCard() {
  return (
    <section className="box-joueur">
      <div className="icone-player">
        <img className="icone-game" src={GameIcone} alt="icone de pièces" />
        <img
          className="icone-game"
          src={CoinIcone}
          alt="icone d'un stick de jeu"
        />
      </div>
      <div className="player-text">
        <SimpleNumberStat
          title="Joueurs inscrits :"
          options="?type=user&format=count"
        />
        <SimpleNumberStat
          title="Joueurs connectés :"
          options="?type=connected&format=count"
        />
      </div>
    </section>
  );
}
