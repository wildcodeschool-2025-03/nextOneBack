import "../../styles/navbar.css";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import { LoginContext } from "../../Auth/LoginContext";
import UserGamerIcone from "../../assets/icones/usergamer_icone.png";
import NextOneLogo from "../../assets/images/next_one_logo.png";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
  const context = useContext(LoginContext);
  const navigate = useNavigate();

  if (!context) {
    return null;
  }
  const { user, logout } = context;
  // if (user === undefined) {
  //   return null;
  // }
  console.log(user);

  return (
    <nav>
      <article className="burgermenumobile">
        <BurgerMenu />
      </article>

      <NavLink to="/homepage" className="linkDesktop">
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
          onClick={() => {
            if (user) {
              logout();
              navigate("/");
            } else {
              navigate("/");
            }
          }}
          className={`button-login-logout ${user ? "logout" : "login"}`}
        >
          {user ? "Déconnexion" : "Connexion"}
        </button>
        <NavLink to="/adminpage" className="UserIcone">
          <article className="UserIcone">
            <img
              className="userGamerIcone"
              src={UserGamerIcone}
              alt="icone representant un utilisateur avec une casque de  gamer et une manette"
            />
          </article>
        </NavLink>
      </div>
    </nav>
  );
}
