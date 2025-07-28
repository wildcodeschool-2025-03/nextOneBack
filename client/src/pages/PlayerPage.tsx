import "../styles/playerPage.css";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Auth/LoginContext";
import disconnected from "../assets/icones/disconnected.png";
import UserCard from "../components/PlayerInfo/UserCard";

export default function PlayerPage() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) return null;

  const { user, logout } = context;

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
            <h2 className="h2-admin-page">Bonjour,</h2>
            <h2 className="h2-admin-page">{user?.pseudo}</h2>
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

          <section>
            <UserCard />
          </section>

          <div className="box-game">
            <h2 className="h2-admin-page">Mes favoris</h2>
            <span className="barre" />
          </div>
        </section>
      </section>
    </main>
  );
}
