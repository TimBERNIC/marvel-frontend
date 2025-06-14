import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Navbar = ({
  token,
  setToken,
  userId,
  setUserId,
  userName,
  setUserName,
}) => {
  const [button1Click, setButton1Click] = useState(false);
  const [button2Click, setButton2Click] = useState(false);
  const [button3Click, setButton3Click] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="global-navbar-box">
      <div className="navbar-box container">
        <div className="burger-box"></div>
        <section className="navbar-button-box">
          <div
            className="navbar-button"
            onClick={() => {
              setButton1Click(true);
              setTimeout(() => {
                setButton1Click(false);
                navigate("/home");
              }, 200);
            }}></div>
          <p className={button1Click ? "clicked" : ""}>Personnages</p>
        </section>
        <section className="navbar-button-box">
          <div
            className="navbar-button"
            onClick={() => {
              setButton2Click(true);
              setTimeout(() => {
                setButton2Click(false);
                navigate("/comics");
              }, 200);
            }}></div>
          <p className={button2Click ? "clicked" : ""}>Comics</p>
        </section>
        <section className="navbar-button-box">
          <div
            className="navbar-button"
            onClick={() => {
              setButton3Click(true);
              setTimeout(() => {
                setButton3Click(false);
                navigate("/favorites");
              }, 200);
            }}></div>
          <p className={button3Click ? "clicked" : ""}>Mes comics favoris</p>
        </section>

        {location.pathname !== "/login" ? (
          token ? (
            <div
              className="signup-button"
              onClick={() => {
                Cookies.remove("marvelTok");
                setUserName("");
                setUserId("");
                setToken(null);
              }}>
              Se déconnecter{" "}
            </div>
          ) : (
            <div
              className="signup-button"
              onClick={() => {
                navigate("/login");
              }}>
              Connecte-toi | Enregistre-toi
            </div>
          )
        ) : (
          <div className="signup-button-disable"></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
