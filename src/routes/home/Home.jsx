import "./Home.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import marvelLogo from "../../assets/img/Marvel-logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ token }) => {
  const [homeData, setHomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(homeData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvelproject-backend--cp75xnbbqn97.code.run/characters"
        );
        setIsLoading(false);
        setHomeData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header icon={marvelLogo} />
      <Navbar token={token} />

      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : (
        <main>
          <div className="container">
            <div className="global-card-box">
              <div className="title-box">
                <h2>Bienvenue dans l'univers survitaminé de Marvel</h2>
                <p>
                  Choississez une carte pour découvrir les pouvoirs légendaires
                  de vos héros favoris dans toutes leurs aventures !
                </p>
              </div>
              <div className="global-card-box">
                {homeData.map((heroe, index) => {
                  return (
                    <div className="card-box" key={index}>
                      <div className="image-card-box">
                        <img
                          src={
                            heroe.thumbnail.path +
                            "." +
                            heroe.thumbnail.extension
                          }
                          alt="image de super-héro"
                        />
                      </div>
                      <div className="card-details-box">
                        <h3>{heroe.name}</h3>
                        <p className="card-details-text-box">
                          {heroe.description
                            ? heroe.description
                            : "A superhero like no other, but to find out, read his adventures!!"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
