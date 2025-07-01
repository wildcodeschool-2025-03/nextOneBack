import "../../styles/navbar.css";
import { NavLink } from "react-router";
import UserGamerIcone from "../../assets/icones/usergamer_icone.png";
import NextOneLogo from "../../assets/images/next_one_logo.png";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
  return (
    <nav>
      <article className="burgermenumobile">
        <BurgerMenu />
      </article>

      <NavLink to="/HomePage" className="linkDesktop">
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

      <NavLink to="/adminpage" className="UserIcone">
        <img
          className="userGamerIcone"
          src={UserGamerIcone}
          alt="icone representant un utilisateur avec une casque de  gamer et une manette"
        />
      </NavLink>
    </nav>
  );
}
