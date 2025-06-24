import { useState } from "react";
import "../styles/connexion.css";
import axios from "axios";
import { LuEye, LuEyeOff } from "react-icons/lu";

function Connexion() {
  const [firstname, setFirstname] = useState(" ");
  const [name, setName] = useState(" ");
  const [pseudo, setPseudo] = useState(" ");
  const [emailLogin, setEmailLogin] = useState(" ");
  const [emailRegister, setEmailRegister] = useState(" ");
  const [passwordLogin, setPasswordLogin] = useState(" ");
  const [passwordRegister, setPasswordRegister] = useState(" ");
  const [messageLogin, setMessageLogin] = useState(" ");
  const [messageRegister, setMessageRegister] = useState(" ");
  const [type, setType] = useState("password");

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3310/api/connexion/login", {
        email: emailLogin,
        password: passwordLogin,
      });
      setMessageLogin("connexion réussie !!");
    } catch (error) {
      setMessageLogin("connexion échouée, email ou mot de passe incorrect");
    }
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3310/api/connexion/register", {
        firstname,
        name,
        pseudo,
        email: emailRegister,
        password: passwordRegister,
      });
      setMessageRegister("connexion réussie !!");
    } catch (error) {
      setMessageRegister("connexion échouée");
    }
  };

  const handleMouse = () => {
    setType("text");
  };

  const handleMouseLeave = () => {
    setType("password");
  };

  return (
    <>
      <main className="connexion-page">
        <section className="login-contener">
          <h2 className="title-connexion">Se connecter</h2>
          <form onSubmit={login} className="form-login-contener">
            <label htmlFor="email" className="input-row">
              Email
              <input
                type="email"
                onChange={(e) => setEmailLogin(e.target.value)}
              />
            </label>
            <span className="line-connexion" />
            <label htmlFor="password" className="input-row">
              Mot de passe
              <input
                type={type}
                onChange={(e) => setPasswordLogin(e.target.value)}
              />
              <span onMouseEnter={handleMouse} onMouseLeave={handleMouseLeave}>
                {type === "password" ? <LuEyeOff /> : <LuEye />}
              </span>
            </label>
            <span className="line-connexion" />
            <button type="submit" className="button-connexion">
              Se connecter
            </button>
          </form>
          {messageLogin !== "" ? <p>{messageLogin}</p> : null}
        </section>
        <section className="login-contener">
          <h2 className="title-connexion">Créer un compte</h2>
          <form onSubmit={register} className="form-register-contener">
            <label htmlFor="prénom" className="input-row">
              Prénom
              <input
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>
            <span className="line-connexion" />
            <label htmlFor="nom" className="input-row">
              Nom
              <input type="text" onChange={(e) => setName(e.target.value)} />
            </label>
            <span className="line-connexion" />
            <label htmlFor="pseudo" className="input-row">
              Pseudo
              <input type="text" onChange={(e) => setPseudo(e.target.value)} />
            </label>
            <span className="line-connexion" />
            <label htmlFor="email" className="input-row">
              Adresse email
              <input
                type="email"
                onChange={(e) => setEmailRegister(e.target.value)}
              />
            </label>
            <span className="line-connexion" />
            <label htmlFor="password" className="input-row">
              Mot de passe
              <input
                type="password"
                onChange={(e) => setPasswordRegister(e.target.value)}
              />
            </label>
            <span className="line-connexion" />
            <button type="submit" className="button-connexion">
              S'inscrire
            </button>
            {messageRegister !== "" ? <p>{messageRegister}</p> : null}
          </form>
        </section>
      </main>
    </>
  );
}

export default Connexion;
