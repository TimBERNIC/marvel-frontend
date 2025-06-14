import { useState, useEffect } from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const title = "Entrez dans l'univers";
  const title2 = "MARVEL";

  const [displayLetter, setDisplayLetter] = useState("");
  const [showMarvel, setShowMarvel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setDisplayLetter((prev) => prev + title[currentIndex]);
      currentIndex++;

      if (currentIndex === title.length - 1) {
        clearInterval(interval);
        // Affichage MARVEL
        setTimeout(() => {
          setShowMarvel(true);

          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }, 300);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="welcome-main">
      <div className="container global-welcome-box">
        <div
          className="welcome-title-box"
          onClick={() => {
            navigate("/home");
          }}>
          {!showMarvel && <p className="title">{displayLetter}</p>}
          {showMarvel && <p className="marvel-title">{title2}</p>}
        </div>
      </div>
    </main>
  );
};

export default Welcome;
