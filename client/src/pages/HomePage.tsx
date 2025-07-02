import cloud2 from "../assets/images/cloud.png";
import cloud from "../assets/images/clouds-png-23437.png";
import personnage from "../assets/images/monstre.png";
import ArcadeGamesBlock from "../components/Home/ArcadeGamesBlock";
import EventsBlock from "../components/Home/EventsBlock";
import MiniGamesBlock from "../components/Home/MiniGamesBlock";

import "../components/Home/HomePage.css";

export default function HomePage() {
  return (
    <main className="homepage">
      <div className="hero-banner">
        <h1>Next One</h1>
        <img src={cloud} alt="nuage flottant" className="cloud-home1" />
        <img src={cloud2} alt="nuage flottant" className="cloud-home2" />
        <img
          src={personnage}
          alt="petit personnage retro"
          className="perso-retro"
        />
        <p>
          Lance ta partie.
          <br />
          Relève les défis.
        </p>
      </div>
      <section className="home-section">
        <MiniGamesBlock />
      </section>
      <section className="home-section">
        <ArcadeGamesBlock />
      </section>
      <section className="home-section">
        <EventsBlock />
      </section>
    </main>
  );
}
