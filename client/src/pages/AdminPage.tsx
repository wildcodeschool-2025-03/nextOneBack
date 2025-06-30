import "../styles/adminPage.css";
import Bigboss from "../assets/icones/big boss pixel.png";
import CoinIcone from "../assets/icones/coin.png";
import disconnected from "../assets/icones/disconnected.png";
import GameIcone from "../assets/icones/icone_game.png";
import dragon from "../assets/images/red-dragon.png";
export default function AdminPage() {
  return (
    <main className="admin-page">
      <section className="admin-section">
        <img className="red-dragon" src={dragon} alt="red dragon" />
        <h1 className="h1-admin-page">TABLEAU DE BORD</h1>
        <section className="grid-box">
          <section className="box-admin">
            <h2 className="h2-admin-page">ADMIN</h2>
            <span className="barre" />
            <span className="barre" />
            <button className="button-deconnexion" type="button">
              <img
                className="button-disconnected"
                src={disconnected}
                alt="disconnected button"
              />
              <span className="text-disconnexion">Déconnnexion</span>
            </button>
          </section>
          <img
            className="bigboss-img"
            src={Bigboss}
            alt="un chef a son bureau"
          />

          <section className="box-player">
            <div className="icone-player">
              <img
                className="icone-game"
                src={GameIcone}
                alt="icone de pièces"
              />
              <img
                className="icone-game"
                src={CoinIcone}
                alt="icone d'un stick de jeu"
              />
            </div>
            <div className="player-text">
              <p className="text-player">Joueurs inscrits :</p>
              <p className="text-player">156</p>
              <p className="text-player">Joueur connectés :</p>
              <p className="text-player">20</p>
            </div>
          </section>

          <div className="box-game">
            <h2 className="h2-admin-page">Gestion des jeux</h2>
            <span className="barre" />
            <button className="add-button-game" type="button">
              + Ajouter
            </button>
          </div>
        </section>
      </section>
      <img className="red-dragon" src={dragon} alt="red dragon" />
    </main>
  );
}
