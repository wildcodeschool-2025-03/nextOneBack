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
      route: "/arcades",
    },
    {
      id: 2,
      title: "SNAKE",
      image: snakeImg,
      route: "/arcades",
    },
    {
      id: 3,
      title: "DINOSAURE",
      image: dinoImg,
      route: "/arcades",
    },
    {
      id: 4,
      title: "TIC-TAC-TOE",
      image: tttImg,
      route: "/arcades",
    },
  ];

  return (
    <div className="arcade-games-container-block">
      <div className="block-title-block ">
        <span className="line-block" />
        <h2 className="title-block">LES ARCADES</h2>
        <span className="line-block" />
      </div>
      <div className="arcade-games-content-block">
        <ArcadeCarousel data={arcadeGames} />
      </div>
    </div>
  );
}
