import "../../styles/navbar.css";
import { useNavigate } from "react-router";
import UserGamerIcone from "../../assets/icones/usergamer_icone.png";
import NextOneLogo from "../../assets/images/next_one_logo.png";
import type { Auth } from "../../types/auth";
import BurgerMenu from "./BurgerMenu";

type NavbarProps = {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
};

export default function Navbar({ auth, setAuth }: NavbarProps) {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setAuth(null);
    navigate("/");
  };

  const login = () => {
    navigate("/");
  };

  return (
    <nav>
      <article className="burgermenumobile">
        <BurgerMenu />
      </article>
      <button className="linkDesktop" type="button">
        {" "}
        Ma Salle !
      </button>
      <button className="linkDesktop" type="button">
        {" "}
        Les arcades
      </button>
      <img
        className="nextOneLogo"
        src={NextOneLogo}
        alt="Logo Next One, logo effet neon"
      />
      <button className="linkDesktop" type="button">
        {" "}
        Tarifs
      </button>
      <div className="button-icon">
        <button
          type="button"
          onClick={auth ? logOut : login}
          className={`button-login-logout ${auth ? "logout" : "login"}`}
        >
          {auth ? "Déconnexion" : "Connexion"}
        </button>
        <article className="UserIcone">
          <img
            className="userGamerIcone"
            src={UserGamerIcone}
            alt="icone representant un utilisateur avec une casque de  gamer et une manette"
          />
        </article>
      </div>
    </nav>
  );
}
