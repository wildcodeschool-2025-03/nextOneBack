import "./ArcadeGamesBlock.css";
import ArcadeCarousel from "../Carousel/ArcadeCarousel.tsx";

import breakoutImg from "../../assets/images/breakout.png";
import dinoImg from "../../assets/images/dinosaure.png";
import snakeImg from "../../assets/images/snake.png";
import tttImg from "../../assets/images/tic-tac-toe.png";

export default function ArcadeGamesBlock() {
  const arcadeGames = [
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
    <div className="arcade-games-container">
      <div className="block-title">
        <span className="line" />
        <h2>LES ARCADES</h2>
        <span className="line" />
      </div>
      <div className="arcade-games-content">
        <ArcadeCarousel data={arcadeGames} />
      </div>
    </div>
  );
}
