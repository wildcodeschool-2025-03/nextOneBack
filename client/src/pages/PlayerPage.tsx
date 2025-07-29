import "../styles/playerPage.css";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Auth/LoginContext";
import disconnected from "../assets/icones/disconnected.png";
import dragon from "../assets/images/monstre.png";
import FavoriteUserCard from "../components/PlayerInfo/FavoriteUserCard";
import UserCard from "../components/PlayerInfo/UserCard";
import { deleteAccount } from "../services/deleteAccount";
export default function PlayerPage() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) return null;

  const { user, logout } = context;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Es-tu sûr de vouloir supprimer ton compte?")) {
      try {
        await deleteAccount();
        toast.success("Compte supprimé avec succès !", {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: true,
        });
        logout();
        navigate("/");
      } catch (err) {
        toast.error("Erreur lors de l'envoi du score 🚫", {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: true,
        });
      }
    }
  };
  return (
    <main className="admin-page">
      <img src={dragon} alt="petit dragon" className="dragon" />
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
          <div className="box-game-favoris">
            <h2 className="h2-admin-page">Mes favoris</h2>
            <span className="barre" />
            <FavoriteUserCard />
          </div>
        </section>
        <article className="delete-button">
          <button
            className="button-delete-account"
            type="button"
            onClick={handleDeleteAccount}
          >
            Supprimer mon compte
          </button>
        </article>
      </section>
    </main>
  );
}
