import "../../styles/footerMobile.css";
import InstagramIcone from "../../assets/icones/icone_instagram.png";
import NextOneLogo from "../../assets/images/next_one_logo.png";

export default function FooterMobile() {
  return (
    <div className="footer-mobile">
      <div className="top-footer">
        <h1>Soyez informé des dernières actualités :</h1>
        <input className="input-mail" type="Votre adresse mail" />
        <button className="registration" type="button">
          S'INSCIRE
        </button>
      </div>
      <div className="bottom-footer">
        <img
          className="nextOneLogo"
          src={NextOneLogo}
          alt="Logo Next One, logo effet neon"
        />

        <div className="three-span">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="icone_instagram"
              src={InstagramIcone}
              alt="icone_instagram"
            />
          </a>
          <span className="link-footer">Nous Contacter</span>
          <span className="link-footer">Mentions Légales</span>
        </div>
      </div>
    </div>
  );
}
