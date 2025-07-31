import "../styles/ContactPage.css";
import carteAdresse from "../assets/images/carteAdresse.png";
import vendetta from "../assets/images/vendetta.png";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="bloc-vendetta">
        <img
          src={vendetta}
          alt="Personnage rétro néon"
          className="vendetta-img"
        />
      </div>

      <div className="bloc-carte">
        <img src={carteAdresse} alt="Carte d'adresse" className="carte-img" />
        <div className="adresse-text">
          <p className="adresse-title">📍 Next One – Salle d’Arcade</p>
          <p className="adresse-descript">
            12 Boulevard des Pixels
            <br />
            75010 Paris, France
          </p>
        </div>
      </div>

      <div className="bloc-horaires">
        <div className="horaire-box">
          <p className="horaire-top">Ouvert 7/7, 365 jours/an</p>
          <p className="horaire-top">
            <strong>Entrée libre, achat de cartes sur place</strong>
          </p>

          <div className="horaire-jours">
            <span>Dimanche au jeudi</span>
            <span>11h à 00h30</span>
          </div>
          <div className="horaire-jours">
            <span>Vendredi - Samedi</span>
            <span>11h à 02h00</span>
          </div>
        </div>
      </div>
    </main>
  );
}
