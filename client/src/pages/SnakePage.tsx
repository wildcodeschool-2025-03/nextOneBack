import SnakeBoard from "../components/Snake/SnakeBoard";
import "../components/Home/MiniGamesBlock.css";
import "../components/Home/HomePage.css";
import { ToastContainer } from "react-toastify";

function SnakePage() {
  return (
    <>
      <section className="home-section">
        <div className="mini-games-container">
          <div className="block-title">
            <span className="line" />
            <h2>Snake</h2>
            <span className="line" />
          </div>
          <div className="mini-games-content">
            <SnakeBoard />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              pauseOnHover
              theme="dark"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default SnakePage;
