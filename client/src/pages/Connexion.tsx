import axios from "axios";
import { useState } from "react";

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
  return (
    <>
      <section>
        <h2>Connexion</h2>
        <form onSubmit={login}>
          <label htmlFor="email">Email</label>
          <input type="email" onChange={(e) => setEmailLogin(e.target.value)} />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
          <button type="submit">Se connecter</button>
        </form>
        {messageLogin !== "" ? <p>{messageLogin}</p> : null}
      </section>
      <section>
        <h2>Créer un compte</h2>
        <form onSubmit={register}>
          <label htmlFor="prénom">Prénom</label>
          <input type="text" onChange={(e) => setFirstname(e.target.value)} />
          <label htmlFor="nom">Nom</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <label htmlFor="pseudo">Pseudo</label>
          <input type="text" onChange={(e) => setPseudo(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={(e) => setEmailRegister(e.target.value)}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            onChange={(e) => setPasswordRegister(e.target.value)}
          />
          <button type="submit">S'inscrire</button>
          {messageRegister !== "" ? <p>{messageRegister}</p> : null}
        </form>
      </section>
    </>
  );
}

export default Connexion;
