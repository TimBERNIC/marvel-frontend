import { useEffect } from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const switchPage = () => {
      setTimeout(() => {
        navigate("/home");
      }, 5000);
    };
    switchPage();
    clearTimeout(switchPage);
  }, []);

  return (
    <main className="welcome-main">
      <div className="container global-welcome-box">
        <div
          className="welcome-title-box"
          onClick={() => {
            navigate("/home");
          }}>
          Entrez dans l'univers MARVEL
        </div>
      </div>
    </main>
  );
};

export default Welcome;
