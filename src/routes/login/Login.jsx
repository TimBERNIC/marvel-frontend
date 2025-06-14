import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import "./Login.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ token, setToken, setUserId, setUserName }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [boxSignupOpen, setBoxSignupOpen] = useState(false);

  const navigate = useNavigate();

  const register = async () => {
    try {
      if (
        password.length > 7 &&
        password === passwordConfirm &&
        name &&
        email &&
        password &&
        passwordConfirm
      ) {
        const response = await axios.post(
          "https://site--marvelproject-backend--cp75xnbbqn97.code.run/user/signup",
          {
            username: name,
            email: email,
            password: password,
          }
        );
        console.log("SignUp request send", response.data);
        Cookies.set("marvelTok", response.data.token, { expires: 7 });
        setBoxSignupOpen(true);
        setPasswordError(false);
        setUserId(response.data._id);
        setUserName(response.data.name);
        navigate("/home");
      } else {
        setPasswordError(true);
        console.log("invalid request");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const loginFunc = async () => {
    try {
      if (email && password) {
        const response = await axios.post(
          "https://site--marvelproject-backend--cp75xnbbqn97.code.run/user/login",
          {
            email: email,
            password: password,
          }
        );
        console.log("Login request send", response.data);
        Cookies.set("marvelTok", response.data.token, { expires: 7 });
        setPasswordError(false);
        setToken(Cookies.get("marvelTok"));
        setUserId(response.data._id);
        setUserName(response.data.name);
        navigate("/home");
      } else {
        setPasswordError(true);
        console.log("invalid request");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <main>
        <div className="container">
          <div className="global-form-div">
            {boxSignupOpen ? (
              <div className="Signup-message">
                <button
                  className="closed-signup-box"
                  onClick={() => {
                    setBoxSignupOpen(!boxSignupOpen);
                    setToken(Cookies.get("marvelTok"));
                    navigate("/home");
                  }}>
                  X
                </button>
                Compte créé ! Bienvenue sur notre site!{" "}
              </div>
            ) : isRegister ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  loginFunc();
                  setToken(Cookies.get("marvelTok"));
                }}>
                <label htmlFor="email">Inscrit ton email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  placeholder="email"
                />
                <label htmlFor="password">Inscrit ton mot de passe</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  placeholder="mot de passe"
                />
                <button className="log-button">Connecte toi</button>
                {passwordError && (
                  <p className="error-message">
                    Veuillez rentrer un email et un mot de passe valide
                  </p>
                )}
                <p
                  className="change-form-box"
                  onClick={() => {
                    setIsRegister(!isRegister);
                  }}>
                  Pas encore enregistré? par ici!
                </p>
              </form>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  register();
                  setToken(Cookies.get("marvelTok"));
                }}>
                <label htmlFor="name">Inscrit ton nom</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  placeholder="Nom"
                />
                <label htmlFor="email">Inscrit ton email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  placeholder="email"
                />
                <label htmlFor="password">Met ici ton mot de passe</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  placeholder="Mot de passe"
                />
                <label htmlFor="passwordConfirm">
                  Confirme ton mot de passe
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(event) => {
                    setPasswordConfirm(event.target.value);
                  }}
                  placeholder="Mot de passe"
                />
                {passwordError && (
                  <p className="error-message">
                    Veuillez remplir tout les champs et deux mots de passe de
                    plus de 8 caractères identiques
                  </p>
                )}
                <button className="log-button">Enregistre toi</button>
                <p
                  className="change-form-box"
                  onClick={() => {
                    setIsRegister(!isRegister);
                  }}>
                  Déjà enregistré? connecte toi!
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
