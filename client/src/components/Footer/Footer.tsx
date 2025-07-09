import emailjs from "emailjs-com";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/footer.css";
import type * as React from "react";

import InstagramIcone from "../../assets/icones/icone_instagram.png";
import NextOneLogo from "../../assets/images/next_one_logo.png";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Validation stricte de l'email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("❌ Adresse email invalide. Veuillez corriger.");
      setIsSending(false);
      return;
    }

    setIsSending(true);

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, { user_email: email }, PUBLIC_KEY)
      .then(() => {
        toast.success("🎉 Email de confirmation envoyé !");
        setEmail("");
      })
      .catch((err) => {
        console.error("Erreur EmailJS :", err);
        toast.error("❌ Une erreur est survenue. Veuillez réessayer.");
      })
      .finally(() => setIsSending(false));
  };

  return (
    <div className="footer-mobile">
      <div className="logo-desktop">
        <img
          className="nextOneLogoDesktop"
          src={NextOneLogo}
          alt="Logo Next One, logo effet neon"
        />
      </div>

      <div className="top-footer">
        <h1 className="h1-footer">Soyez informé des dernières actualités :</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="input-mail"
            type="email"
            placeholder=" Martine.compta@gmail.com "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="registration"
            type="submit"
            disabled={isSending || !email}
          >
            {isSending ? "Envoi..." : "S’INSCRIRE"}
          </button>
        </form>
      </div>

      <div className="bottom-footer">
        <img
          className="nextOneLogoFooter"
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
