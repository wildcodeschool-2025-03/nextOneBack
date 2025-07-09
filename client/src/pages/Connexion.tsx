import axios from "axios";
import "../styles/connexion.css";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Slide, ToastContainer, toast } from "react-toastify";
import { loginContext } from "../Auth/LoginContext";
import type { User } from "../types/auth";

type LoginForm = {
  email: string;
  password: string;
};

type RegisterForm = {
  firstname: string;
  name: string;
  pseudo: string;
  email: string;
  password: string;
  confirm_password?: string;
};

function Connexion() {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm<LoginForm>();

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    watch,
    formState: { errors: errorsRegister },
  } = useForm<RegisterForm>();

  const context = useContext(loginContext);
  if (!context) {
    return null;
  }
  const { setUser } = context;

  const navigate = useNavigate();
  const login = async (data: LoginForm) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/connexion/login`,
        data,
      );
      const { token, user }: { token: string; user: User } = response.data;
      localStorage.setItem("token", token);
      setUser(user);

      toast.success("connexion réussie !!");
      setTimeout(() => {
        navigate("/HomePage");
      }, 2000);
    } catch (error) {
      toast.error("connexion échouée, email ou mot de passe incorrect");
    }
  };

  const onRegister = async (data: RegisterForm) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/connexion/register`,
        data,
      );
      const { token, user }: { token: string; user: User } = response.data;
      localStorage.setItem("token", token);
      setUser(user);

      toast.success("inscription réussie !!");
      setTimeout(() => {
        navigate("/HomePage");
      }, 2000);
    } catch (error) {
      toast.error("inscription échouée");
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <main className="connexion-page">
        {/* connexion */}
        <section className="login-contener">
          <h2 className="title-connexion">Connexion</h2>
          <form
            onSubmit={handleSubmitLogin(login)}
            className="form-login-contener"
          >
            <div className="input-row">
              <label htmlFor="email-login">Email</label>
              <input
                type="email"
                id="email-login"
                {...registerLogin("email", {
                  required: "email requis",
                  pattern: {
                    value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                    message: "L'email saisi n'a pas un format valide",
                  },
                })}
              />
            </div>
            <span className="line-connexion" />
            {errorsLogin.email && (
              <p className="error-message">{errorsLogin.email.message}</p>
            )}
            <div className="input-row">
              <label htmlFor="password-login">Mot de passe</label>
              <input
                type="password"
                id="password-login"
                {...registerLogin("password", {
                  required: "Mot de passe requis",
                })}
              />
            </div>

            <span className="line-connexion" />
            {errorsLogin.password && (
              <p className="error-message">{errorsLogin.password.message}</p>
            )}
            <button type="submit" className="button-connexion">
              Se connecter
            </button>

            {/* inscription */}
          </form>
        </section>
        <section className="login-contener">
          <h2 className="title-connexion">Créer un compte</h2>
          <form
            onSubmit={handleSubmitRegister(onRegister)}
            className="form-register-contener"
          >
            <div className="firstname-name">
              <div className="input-row">
                <label htmlFor="firstname">Prénom</label>
                <input
                  type="text"
                  {...registerRegister("firstname", {
                    required: "Prénom requis",
                    pattern: {
                      value:
                        /^((?:(?:[a-zA-Z]+)(?:-(?:[a-zA-Z]+))+)|(?:[a-zA-Z]+))$/,
                      message: "Le prénom saisi n'a pas un format valide",
                    },
                  })}
                />
              </div>
              <div className="input-row">
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  {...registerRegister("name", {
                    required: "Nom requis",
                    pattern: {
                      value:
                        /^((?:(?:[a-zA-Z]+)(?:-(?:[a-zA-Z]+))+)|(?:[a-zA-Z]+))$/,
                      message: "Le nom saisi n'a pas un format valide",
                    },
                  })}
                />
              </div>
            </div>
            {errorsRegister.firstname && (
              <p className="error-message">
                {errorsRegister.firstname.message}
              </p>
            )}
            {errorsRegister.name && (
              <p className="error-message">{errorsRegister.name.message}</p>
            )}
            <span className="line-connexion" />
            <div className="input-row">
              <label htmlFor="pseudo">Pseudo</label>
              <input
                type="text"
                {...registerRegister("pseudo", {
                  required: "Pseudo requis",
                  pattern: {
                    value: /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/,
                    message: "Le pseudo saisi n'a pas un format valide",
                  },
                })}
              />
            </div>
            <span className="line-connexion" />
            {errorsRegister.pseudo && (
              <p className="error-message">{errorsRegister.pseudo.message}</p>
            )}
            <div className="input-row">
              <label htmlFor="email-register">Email</label>
              <input
                type="email"
                id="email-register"
                {...registerRegister("email", {
                  required: "email requis",
                  pattern: {
                    value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                    message: "L'email saisi n'a pas un format valide",
                  },
                })}
              />
            </div>
            <span className="line-connexion" />
            {errorsRegister.email && (
              <p className="error-message">{errorsRegister.email.message}</p>
            )}
            <div className="input-row">
              <label htmlFor="password-register">Mot de passe</label>
              <input
                type="password"
                id="password-register"
                {...registerRegister("password", {
                  required: "Mot de passe requis",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){5,16}$/,
                    message: "Le mot de passe saisi n'a pas un format valide",
                  },
                })}
              />
            </div>
            <span className="line-connexion" />
            {errorsRegister.password && (
              <p className="error-message">{errorsRegister.password.message}</p>
            )}

            <div className="input-row">
              <label htmlFor="confirm-password">
                Confirmation du mot de passe
              </label>
              <input
                type="password"
                id="confirm-password"
                {...registerRegister("confirm_password", {
                  validate: (value) => {
                    if (value !== watch("password")) {
                      return "Veuillez vérifier : les mots de passe ne sont pas identiques";
                    }
                  },
                })}
              />
            </div>
            <span className="line-connexion" />
            {errorsRegister.confirm_password && (
              <p className="error-message">
                {errorsRegister.confirm_password.message}
              </p>
            )}

            <button type="submit" className="button-connexion">
              S'inscrire
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Connexion;
