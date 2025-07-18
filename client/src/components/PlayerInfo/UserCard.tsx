import "../../styles/playerPage.css";
import GameIcone from "../../assets/icones/icone_game.png";

export default function UserCard() {
  return (
    <section className="box-player">
      <img className="icone-game" src={GameIcone} alt="icone de pièces" />
    </section>
  );
}
