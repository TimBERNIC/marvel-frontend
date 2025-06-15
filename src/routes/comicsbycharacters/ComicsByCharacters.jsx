import { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ComicsByCharacters.css";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import etoileLogo from "../../assets/img/etoileLogo.png";
import { FaArrowLeft } from "react-icons/fa6";

const ComicsByCharacters = ({
  token,
  setToken,
  favoritesTab,
  setFavoritesTab,
}) => {
  const params = useParams();
  const [heroeData, setHeroeData] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [tempData, setTempData] = useState("");
  const navigate = useNavigate();

  const {
    comics,
    name,
    thumbnail: avatar,
    _id: characterId,
    description,
  } = heroeData;

  useEffect(() => {
    const fetchComicsByHeroeData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelproject-backend--cp75xnbbqn97.code.run/comics/${params.id}`
        );
        setisLoading(false);
        setHeroeData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchComicsByHeroeData();
  }, []);

  const foundFavorite = favoritesTab.find(
    (favoriteCharacter) => favoriteCharacter.characterId === characterId
  );

  const foundFavoriteIndex = favoritesTab.findIndex(
    (favoriteCharacter) => favoriteCharacter.characterId === characterId
  );

  const addCharacterToFavorite = async () => {
    try {
      const response = await axios.put(
        `https://site--marvelproject-backend--cp75xnbbqn97.code.run/user/favorite/add?characterId=${characterId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const copyTab = [...favoritesTab];
      copyTab.push({ characterId });
      setFavoritesTab(copyTab);
    } catch (error) {
      console.log(error.response);
    }
  };

  const removeCharacterToFavorite = async () => {
    try {
      const response = await axios.put(
        `https://site--marvelproject-backend--cp75xnbbqn97.code.run/user/favorite/remove?characterId=${characterId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const copyTab = [...favoritesTab];
      copyTab.splice(foundFavoriteIndex, 1);
      setFavoritesTab(copyTab);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Navbar token={token} setToken={setToken} />

      {isLoading ? (
        <p className="loading-box">Chargement en cours... </p>
      ) : (
        <main className="ComicsByCharacters-main">
          <div className="container">
            <div className="avatar-box">
              <button
                className="back-button"
                onClick={() => {
                  navigate("/home");
                }}>
                <FaArrowLeft />
              </button>
              <h1>{name}</h1>
              <div className="avatar-picture-box">
                <img
                  src={avatar.path + "." + avatar.extension}
                  alt="avatar du héro"
                />
                {token ? (
                  foundFavorite ? (
                    <button
                      className="favorite-button-star-captain-character"
                      onClick={removeCharacterToFavorite}>
                      <span className="metal-star-wrapper">
                        <img src={etoileLogo} alt="" />
                      </span>
                    </button>
                  ) : (
                    <button
                      className="favorite-button-character"
                      onClick={addCharacterToFavorite}>
                      <p className="favorite-button-text">
                        Cliquez pour ajouter en favoris
                      </p>
                    </button>
                  )
                ) : (
                  <p></p>
                )}
              </div>
              <div className="heroe-presentation">
                {description
                  ? description
                  : "An Unknown heroe in a forgotten world. it's to you to find his way..."}
              </div>
              <h2>
                Comics dans lesquels vous pourrez retrouver{" "}
                <span className="weight">{name}</span>
              </h2>
            </div>

            {comics.length ? (
              <div className="heroe-comics-box">
                {comics.map((comic, index) => {
                  return (
                    <div
                      className="heroe-comic-box"
                      key={index}
                      onClick={() => {
                        setTempData({
                          picture:
                            comic.thumbnail.path +
                            "." +
                            comic.thumbnail.extension,
                          title: comic.title ? comic.title : "Unknown title",
                          description: comic.description
                            ? comic.description
                            : "A superhero like no other, but to find out, read his adventures!!",
                          comicId: comic._id,
                        });
                        setIsVisible(!isVisible);
                      }}>
                      <h3>{comic.title}</h3>
                      <div className="heroe-comic-picture-box">
                        <img
                          src={
                            comic.thumbnail.path +
                            "." +
                            comic.thumbnail.extension
                          }
                          alt="photo du comic"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-comic">Encore aucun comic paru à ce jour</p>
            )}
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

export default ComicsByCharacters;
