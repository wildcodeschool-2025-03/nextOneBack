import "../styles/adminPage.css";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Auth/LoginContext";
import Bigboss from "../assets/icones/big boss pixel.png";
import disconnected from "../assets/icones/disconnected.png";
import PlayerCard from "../components/PlayerInfo/PlayerCard";

export default function AdminPage() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) return null;

  const { logout } = context;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="admin-page">
      <section className="admin-section">
        <h1 className="h1-admin-page">TABLEAU DE BORD</h1>

        <section className="grid-box">
          <section className="box-admin">
            <h2 className="h2-admin-page">ADMIN</h2>
            <span className="barre" />
            <span className="barre" />

            <button
              className="button-deconnexion"
              type="button"
              onClick={handleLogout}
            >
              <img
                className="button-disconnected"
                src={disconnected}
                alt="déconnexion"
              />
              <span className="text-disconnexion">Déconnexion</span>
            </button>
          </section>

          <img
            className="bigboss-img"
            src={Bigboss}
            alt="un chef à son bureau"
          />

          <section>
            <PlayerCard />
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
    </main>
  );
}
