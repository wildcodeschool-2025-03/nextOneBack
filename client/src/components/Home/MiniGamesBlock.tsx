import "./MiniGamesBlock.css";
import { useContext } from "react";
import { AuthContext } from "../../Auth/LoginContext";
import breakoutImg from "../../assets/images/breakout.png";
import dinoImg from "../../assets/images/dinosaure.png";
import snakeImg from "../../assets/images/snake.png";
import tttImg from "../../assets/images/tic-tac-toe.png";
import Carousel from "../Carousel/MiniGameCarousel";

export default function MiniGamesBlock() {
  const context = useContext(AuthContext);
  const user = context?.user;

  const games = [
    {
      id: 1,
      title: "BREAKOUT",
      image: breakoutImg,
      route: "/breakout",
    },
    {
      id: 2,
      title: "SNAKE",
      image: snakeImg,
      route: "/snake",
    },
    {
      id: 3,
      title: "DINOSAURE",
      image: dinoImg,
      route: "/dino",
    },
    {
      id: 4,
      title: "TIC-TAC-TOE",
      image: tttImg,
      route: "/tic-tac-toe",
    },
  ];

  return (
    <div className="mini-games-container">
      <div className="block-title-mini">
        <span className="line-mini" />
        <h2 className="title-mini">MINI - JEUX</h2>
        <span className="line-mini" />
      </div>
      <div className="mini-games-content">
        <Carousel data={games} isAuthenticated={!!user} />
      </div>
    </div>
  );
}
