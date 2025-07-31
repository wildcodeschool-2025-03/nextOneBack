import cloud2 from "../assets/images/cloud.png";
import cloud from "../assets/images/clouds-png-23437.png";
import cat from "../assets/images/flying-men.png";
import dragon from "../assets/images/monstre.png";
import { Events } from "../components/Evenement/Events";
import ArcadeGamesBlock from "../components/Home/ArcadeGamesBlock";
import MiniGamesBlock from "../components/Home/MiniGamesBlock";

import "../components/Home/HomePage.css";

export default function HomePage() {
  return (
    <main className="homepage">
      <img src={cloud} alt="nuage flottant" className="cloud-home1" />
      <img src={cloud2} alt="nuage flottant" className="cloud-home2" />
      <img src={dragon} alt="petit dragon" className="dragon" />
      <img src={cat} alt="petit cat" className="chat" />
      <div className="hero-banner">
        <h1>Next One</h1>
        <p>
          Lance ta partie.
          <br />
          Relève les défis.
        </p>
      </div>
      <div className="home-section-flex">
        <section className="home-section">
          <MiniGamesBlock />
        </section>
        <section className="home-section">
          <ArcadeGamesBlock />
        </section>
        <section className="home-section">
          <Events />
        </section>
      </div>
      <img src={cloud2} alt="nuage flottant" className="cloud-home4" />
      <img src={cloud} alt="nuage flottant" className="cloud-home3" />
    </main>
  );
}
