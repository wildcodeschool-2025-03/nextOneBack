import "../../styles/navbar.css";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/LoginContext";
import UserGamerIcone from "../../assets/icones/usergamer_icone.png";
import NextOneLogo from "../../assets/images/next_one_logo.png";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) return null;

  const { user, logout } = context;

  const handleClick = () => {
    logout();
    navigate("/");
  };

  const targetRoute = user
    ? user.id_role === 2
      ? "/admin"
      : `/player/${user.pseudo}`
    : "/";

  return (
    <nav>
      <article className="burgermenumobile">
        <BurgerMenu />
      </article>

      <NavLink to="/accueil" className="linkDesktop">
        <span>Ma Salle !</span>
      </NavLink>

      <NavLink to="/arcades" className="linkDesktop">
        <span>Les arcades</span>
      </NavLink>

      <img
        className="nextOneLogo"
        src={NextOneLogo}
        alt="Logo Next One, logo effet neon"
      />

      <NavLink to="/tarifs" className="linkDesktop">
        <span>Tarifs</span>
      </NavLink>

      <div className="button-icon">
        <button
          type="button"
          onClick={user ? handleClick : () => navigate("/")}
          className={`button-login-logout ${user ? "logout" : "login"}`}
        >
          {user ? "Déconnexion" : "Connexion"}
        </button>

        <NavLink to={targetRoute} className="UserIcone">
          <article className="UserIcone">
            <img
              className="userGamerIcone"
              src={UserGamerIcone}
              alt="Icône représentant un utilisateur gamer"
            />
          </article>
        </NavLink>
      </div>
    </nav>
  );
}
