import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Slide, ToastContainer, toast } from "react-toastify";

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

  const navigate = useNavigate();
  const login = async (data: LoginForm) => {
    try {
      await axios.post("http://localhost:3310/api/connexion/login", {
        email: data.email,
        password: data.password,
      });
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
      data.confirm_password = undefined;
      await axios.post("http://localhost:3310/api/connexion/register", data);
      toast.success("inscription réussie !!");
      setTimeout(() => {
        navigate("/HomePage");
      }, 2000);
    } catch (error) {
      console.error("erreur inscription :", error);
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
      {/* connexion */}
      <section>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmitLogin(login)}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...registerLogin("email", {
              required: "email requis",
              pattern: {
                value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                message: "L'email saisi n'a pas un format valide",
              },
            })}
          />
          {errorsLogin.email && <p>{errorsLogin.email.message}</p>}

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            {...registerLogin("password", {
              required: "Mot de passe requis",
            })}
          />
          {errorsLogin.password && <p>{errorsLogin.password.message}</p>}
          <button type="submit">Se connecter</button>

          {/* inscription */}
        </form>
      </section>
      <section>
        <h2>Créer un compte</h2>
        <form onSubmit={handleSubmitRegister(onRegister)}>
          <label htmlFor="prénom">Prénom</label>
          <input
            type="text"
            {...registerRegister("firstname", {
              required: "Prénom requis",
              pattern: {
                value: /^((?:(?:[a-zA-Z]+)(?:-(?:[a-zA-Z]+))+)|(?:[a-zA-Z]+))$/,
                message: "Le prénom saisi n'a pas un format valide",
              },
            })}
          />
          {errorsRegister.firstname && (
            <p>{errorsRegister.firstname.message}</p>
          )}
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            {...registerRegister("name", {
              required: "Nom requis",
              pattern: {
                value: /^((?:(?:[a-zA-Z]+)(?:-(?:[a-zA-Z]+))+)|(?:[a-zA-Z]+))$/,
                message: "Le nom saisi n'a pas un format valide",
              },
            })}
          />
          {errorsRegister.name && <p>{errorsRegister.name.message}</p>}
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
          {errorsRegister.pseudo && <p>{errorsRegister.pseudo.message}</p>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...registerRegister("email", {
              required: "email requis",
              pattern: {
                value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                message: "L'email saisi n'a pas un format valide",
              },
            })}
          />
          {errorsRegister.email && <p>{errorsRegister.email.message}</p>}

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            {...registerRegister("password", {
              required: "Mot de passe requis",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){5,16}$/,
                message: "Le mot de passe saisi n'a pas un format valide",
              },
            })}
          />
          {errorsRegister.password && <p>{errorsRegister.password.message}</p>}

          <label htmlFor="password">Confirmation du mot de passe</label>
          <input
            type="password"
            {...registerRegister("confirm_password", {
              validate: (value) => {
                if (value !== watch("password")) {
                  return "Veuillez vérifier : les mots de passe ne sont pas identiques";
                }
              },
            })}
          />
          {errorsRegister.confirm_password && (
            <p>{errorsRegister.confirm_password.message}</p>
          )}
          <button type="submit">S'inscrire</button>
        </form>
      </section>
    </>
  );
}

export default Connexion;
