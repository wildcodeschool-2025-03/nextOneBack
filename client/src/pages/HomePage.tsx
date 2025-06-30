import ArcadeGamesBlock from "../components/Home/ArcadeGamesBlock";
import EventsBlock from "../components/Home/EventsBlock";
import MiniGamesBlock from "../components/Home/MiniGamesBlock";

import "../components/Home/HomePage.css";

export default function HomePage() {
  return (
    <main className="homepage">
      <div className="hero-banner">
        <h1>Next One</h1>
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
