import Navbar from "../components/Navbar/Navbar";
import SnakeBoard from "../components/Snake/SnakeBoard";
import "../components/Home/MiniGamesBlock.css";
import "../components/Home/HomePage.css";
import Footer from "../components/Footer/Footer";
function SnakePage() {
  return (
    <>
      <Navbar />
      <section className="home-section">
        <div className="mini-games-container">
          <div className="block-title">
            <span className="line" />
            <h2>Snake</h2>
            <span className="line" />
          </div>
          <div className="mini-games-content">
            <SnakeBoard />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default SnakePage;
