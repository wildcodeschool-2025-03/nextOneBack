import "../../styles/navbar.css";
import UserGamerIcone from "../../assets/icones/usergamer_icone.png";
import NextOneLogo from "../../assets/images/next_one_logo.png";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
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
      <article className="UserIcone">
        <img
          className="userGamerIcone"
          src={UserGamerIcone}
          alt="icone representant un utilisateur avec une casque de  gamer et une manette"
        />
      </article>
    </nav>
  );
}
