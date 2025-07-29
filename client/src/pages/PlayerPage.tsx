import "../styles/playerPage.css";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../Auth/LoginContext";
import disconnected from "../assets/icones/disconnected.png";
import UserCard from "../components/PlayerInfo/UserCard";

export default function PlayerPage() {
  const context = useContext(LoginContext);
  const navigate = useNavigate();

  if (!context) {
    return null;
  }
  const { user, logout } = context;
  return (
    <main className="admin-page">
      <section className="admin-section">
        <h1 className="h1-admin-page">TABLEAU DE BORD</h1>
        <section className="grid-box">
          <section className="box-user">
            <h2 className="h2-admin-page">Bonjour, </h2>
            <h2 className="h2-admin-page">{user?.pseudo}</h2>
            <span className="barre" />
            <button
              className="button-deconnexion"
              type="button"
              onClick={() => {
                if (user) {
                  logout();
                  navigate("/");
                } else {
                  navigate("/");
                }
              }}
            >
              <img
                className="button-disconnected"
                src={disconnected}
                alt="disconnected button"
              />
              <span className="text-disconnexion">Déconnnexion</span>
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
