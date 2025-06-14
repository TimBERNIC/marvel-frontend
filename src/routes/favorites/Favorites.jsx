import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { MdOutlineStar } from "react-icons/md";
import "./Favorites.css";
import axios from "axios";
import Modal from "../../components/modal/Modal";

const Favorites = ({
  token,
  setToken,
  userId,
  setUserId,
  userName,
  setUserName,
  favoritesTab,
  setFavoritesTab,
}) => {
  const [isLoading, setisLoading] = useState(true);
  const [favoritesComicsDataTab, setfavoritesComicsDataTab] = useState([]);
  const [favoritesCharactersDataTab, setFavoritesCharactersDataTab] = useState(
    []
  );

  console.log(favoritesTab);
  console.log(favoritesComicsDataTab);
  console.log(favoritesCharactersDataTab);

  // pour les Modal
  const [isVisible, setIsVisible] = useState(false);
  const [tempData, setTempData] = useState([]);

  //  le UseEffect le plus dur de ma carrière de débutant 🥵🥵🥵🥵
  useEffect(() => {
    const fetchComicData = async () => {
      try {
        const fetchAllComicsData = favoritesTab
          .filter((element) => element.comicId)
          .map((element) => {
            return axios.get(
              `https://site--marvelproject-backend--cp75xnbbqn97.code.run/comic/${element.comicId}`
            );
          });

        //Ok renvoie un tableau avec toutes les promises après await
        const responses = await Promise.all(fetchAllComicsData);

        // on map le tableau dans le set... Pfiouuuuu

        setfavoritesComicsDataTab(
          responses.map((response) => {
            return response.data;
          })
        );
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchCharactersData = async () => {
      try {
        const fetchAllCharactersData = favoritesTab
          .filter((element) => element.characterId)
          .map((element) => {
            return axios.get(
              `https://site--marvelproject-backend--cp75xnbbqn97.code.run/character/${element.characterId}`
            );
          });

        const responses = await Promise.all(fetchAllCharactersData);

        console.log(responses);
        setFavoritesCharactersDataTab(
          responses.map((response) => {
            return response.data;
          })
        );
      } catch (error) {
        console.log(error.message);
      }
    };

    setisLoading(false);
    fetchComicData();
    fetchCharactersData();
  }, [favoritesTab]);

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

      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : (
        <main>
          <div className="container">
            <div className="global-favorite-Box">
              {!token && (
                <div className="favorite-login-box">
                  Veuillez vous connecter pour accéder aux page de favoris
                </div>
              )}
              {token && (
                <div className="favorites-box">
                  <h1 className="favorite-title">
                    <MdOutlineStar color="orange" />
                    Bienvenue sur ta connection {userName}!
                    <MdOutlineStar color="orange" />
                  </h1>
                  <p className="favorite-text">
                    Voici tout tes favoris sélectionnés à ce jour
                  </p>

                  <div className="global-favorite-character-box">
                    <h3 className="subtitle-favorite">Tes héros Favoris</h3>
                    <div className="favorite-characters-box">
                      {favoritesCharactersDataTab.map((character, index) => {
                        return (
                          <div
                            className="character-box"
                            key={index}
                            onClick={() => {
                              setIsVisible(!isVisible);
                              setTempData({
                                picture:
                                  character.thumbnail.path +
                                  "." +
                                  character.thumbnail.extension,
                                title: character.name
                                  ? character.name
                                  : "Unknown",
                                description: character.description
                                  ? character.description
                                  : "A superhero like no other, but to find out, read his adventures!!",
                                characterId: character._id,
                              });
                            }}>
                            <div className="characters-details-name">
                              <h3>
                                {character.name
                                  ? character.name
                                  : "Unknown title"}
                              </h3>
                            </div>
                            <div className="image-character-box">
                              <img
                                src={
                                  character.thumbnail.path +
                                  "." +
                                  character.thumbnail.extension
                                }
                                alt="image du character "
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="global-favorite-comics-box">
                    <h3 className="subtitle-favorite">Tes Comics Favoris</h3>
                    {/* Map des Comics favoris */}
                    {favoritesComicsDataTab.map((comic, index) => {
                      return (
                        <div
                          className="comic-box"
                          key={index}
                          onClick={() => {
                            setIsVisible(!isVisible);
                            setTempData({
                              picture:
                                comic.thumbnail.path +
                                "." +
                                comic.thumbnail.extension,
                              title: comic.title
                                ? comic.title
                                : "Unknown title",
                              description: comic.description
                                ? comic.description
                                : "A superhero like no other, but to find out, read his adventures!!",
                              comicId: comic._id,
                            });
                          }}>
                          <h3 className="favorite-comic-title">
                            {comic.title ? comic.title : "Unknown title"}
                          </h3>
                          <div className="favorite-image-comic-box">
                            <img
                              src={
                                comic.thumbnail.path +
                                "." +
                                comic.thumbnail.extension
                              }
                              alt="image du comics "
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Modal
            tempData={tempData}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            token={token}
            favoritesTab={favoritesTab}
            setFavoritesTab={setFavoritesTab}
          />
        </main>
      )}
    </>
  );
};

export default Favorites;
