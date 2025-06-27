import "./styles/paused.css";

export default function Paused() {
  return (
    <div className="paused-overlay">
      <div className="paused-box">
        <p>⏸️ Jeu en pause (Espace pour reprendre)</p>
      </div>
    </div>
  );
}
