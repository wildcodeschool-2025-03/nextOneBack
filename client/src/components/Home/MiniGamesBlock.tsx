import "./MiniGamesBlock.css";
import useAuth from "../../hooks/useAuth";
import Carousel from "../Carousel/MiniGameCarousel.tsx";

import breakoutImg from "../../assets/images/breakout.png";
import dinoImg from "../../assets/images/dinosaure.png";
import snakeImg from "../../assets/images/snake.png";
import tttImg from "../../assets/images/tic-tac-toe.png";

export default function MiniGamesBlock() {
  const { isAuthenticated } = useAuth();

  const games = [
    {
      id: 1,
      title: "BREAKOUT",
      image: breakoutImg,
      route: "/games/breakout",
    },
    {
      id: 2,
      title: "SNAKE",
      image: snakeImg,
      route: "/games/snake",
    },
    {
      id: 3,
      title: "DINOSAURE",
      image: dinoImg,
      route: "/games/dino",
    },
    {
      id: 4,
      title: "TIC-TAC-TOE",
      image: tttImg,
      route: "/games/tic-tac-toe",
    },
  ];

  return (
    <div className="mini-games-container">
      <div className="block-title">
        <span className="line" />
        <h2>MINI - JEUX</h2>
        <span className="line" />
      </div>
      <div className="mini-games-content">
        <Carousel data={games} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}
