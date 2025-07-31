import TicTacToe from "../components/TicTacToe/TicTacToe";

function TicTacToePage() {
  return (
    <>
      <section className="home-section">
        <div className="mini-games-container">
          <div className="block-title">
            <span className="line" />
            <h2>Tic-Tac-Toe</h2>
            <span className="line" />
          </div>

          <TicTacToe />
        </div>
      </section>
    </>
  );
}

export default TicTacToePage;
