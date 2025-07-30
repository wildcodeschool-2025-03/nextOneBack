import { useState } from "react";
import "../../styles/navbar.css";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Auth/LoginContext";

export default function BurgerMenu() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    return null;
  }
  const { user, logout } = context;

  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };
  return (
    <div className="menuBurger">
      <div className="align-burger">
        <div className="menuBurger">
          <button type="button" className="burger-menu" onClick={updateMenu}>
            <span className={burgerClass}> </span>
            <span className={burgerClass}> </span>
            <span className={burgerClass}> </span>
          </button>
        </div>
      </div>
      <div className={menuClass}>
        <span className="barre" />
        <NavLink to="/accueil" className="linkButton">
          <span>Ma Salle !</span>
        </NavLink>
        <span className="barre" />
        <NavLink to="/arcades" className="linkButton">
          <span>Les arcades</span>
        </NavLink>

        <span className="barre" />
        <NavLink to="/tarifs" className="linkButton">
          <span>Tarifs</span>
        </NavLink>
        <span className="barre" />
        <span>
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
        </span>
      </div>
    </div>
  );
}
