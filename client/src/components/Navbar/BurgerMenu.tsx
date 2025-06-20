import { useState } from "react";
import "../../styles/navbar.css";

export default function BurgerMenu() {
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
        <button className="linkButton" type="button">
          Ma salle !
        </button>
        <button className="linkButton" type="button">
          Les arcades
        </button>
        <button className="linkButton" type="button">
          Tarifs
        </button>
      </div>
    </div>
  );
}
