import "./Home.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";

const Home = ({
  token,
  setToken,
  searchingName,
  setSearchingName,
  userId,
  setUserId,
  userName,
  setUserName,
}) => {
  const [homeData, setHomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setlimit] = useState(100);
  const [skip, setSkip] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filter = "";

        if (searchingName) {
          filter += `?name=${searchingName}`;
        }
        if (limit) {
          filter += searchingName ? `&limit=${limit}` : `?limit=${limit}`;
        }
        if (skip) {
          filter += searchingName || limit ? `&skip=${skip}` : `?skip=${skip}`;
        }

        const response = await axios.get(
          `https://site--marvelproject-backend--cp75xnbbqn97.code.run/characters${filter}`
        );
        setIsLoading(false);
        setHomeData(response.data.results);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [searchingName, skip, limit]);

  return (
    <>
      <Navbar
        token={token}
        setToken={setToken}
        userId={userId}
        setUserId={setUserId}
        userName={userName}
        setUserName={setUserName}
      />
      <main>
        {isLoading ? (
          <p className="loading-box">Chargement en cours...</p>
        ) : (
          <div className="container">
            <div className="global-home-box">
              <div className="title-home-box">
                <h1>Bienvenue dans l'univers survitaminé de Marvel</h1>
                <h2>
                  Choississez une carte pour découvrir les pouvoirs légendaires
                  de vos héros favoris dans toutes leurs aventures !
                </h2>
              </div>
              <div className="global-card-box">
                {homeData.map((heroe, index) => {
                  return (
                    <div
                      className="card-box"
                      key={index}
                      onClick={() => {
                        navigate(`/${heroe._id}/comics`);
                      }}>
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
              <Pagination skip={skip} setSkip={setSkip} homeData={homeData} />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
