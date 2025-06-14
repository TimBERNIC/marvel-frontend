import Navbar from "../../components/navbar/Navbar";
import "./Comics.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";
import Modal from "../../components/modal/Modal";
import etoileLogo from "../../assets/img/etoileLogo.png";

const Comics = ({
  token,
  setToken,
  searchingTitle,
  setSearchingTitle,
  userId,
  setUserId,
  userName,
  setUserName,
  favoritesTab,
  setFavoritesTab,
}) => {
  const [comicsData, setComicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comicslimit, setComicslimit] = useState(12);
  const [isVisible, setIsVisible] = useState(false);
  const [tempData, setTempData] = useState("");
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filter = "";

        if (searchingTitle) {
          filter += `?title=${searchingTitle}`;
        }
        if (comicslimit) {
          filter += searchingTitle
            ? `&limit=${comicslimit}`
            : `?limit=${comicslimit}`;
        }
        if (skip) {
          filter +=
            searchingTitle || comicslimit ? `&skip=${skip}` : `?skip=${skip}`;
        }

        const response = await axios.get(
          `https://site--marvelproject-backend--cp75xnbbqn97.code.run/comics${filter}`
        );
        setIsLoading(false);
        setComicsData(response.data.results);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [searchingTitle, skip, comicslimit]);

  const addComicToFavorite = async (comicId) => {
    try {
      const response = await axios.put(
        `https://site--marvelproject-backend--cp75xnbbqn97.code.run/user/favorite/add?comicId=${comicId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const copyTab = [...favoritesTab];
      copyTab.push({ comicId: comicId });
      setFavoritesTab(copyTab);
    } catch (error) {
      console.log(error.response);
    }
  };

  const removeComicToFavorite = async (comicId, foundFavoriteComicIndex) => {
    try {
      const response = await axios.put(
        `https://site--marvelproject-backend--cp75xnbbqn97.code.run/user/favorite/remove?comicId=${comicId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const copyTab = [...favoritesTab];
      copyTab.splice(foundFavoriteComicIndex, 1);
      setFavoritesTab(copyTab);
    } catch (error) {
      console.log(error.response);
    }
  };

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
            <div className="global-comics-box">
              <div className="title-comics-box">
                <h1>Découvrez tout les comics de la license</h1>
                <h2>
                  Choississez l'un d'entre eux pour découvrir des détails et
                  résumés à leur sujet!
                </h2>
              </div>
              <div className="global-comics-box">
                {comicsData.map((comic, index) => {
                  const foundFavoriteComic = favoritesTab.find(
                    (favoriteComic) => {
                      return favoriteComic.comicId === comic._id;
                    }
                  );
                  const foundFavoriteComicIndex = favoritesTab.findIndex(
                    (favoriteComic) => {
                      return favoriteComic.comicId === comic._id;
                    }
                  );

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
                          title: comic.title ? comic.title : "Unknown title",
                          description: comic.description
                            ? comic.description
                            : "A superhero like no other, but to find out, read his adventures!!",
                          comicId: comic._id,
                        });
                      }}>
                      <h3 className="comic-titles">
                        {comic.title ? comic.title : "Unknown title"}
                      </h3>

                      <div className="image-comic-box">
                        <img
                          src={
                            comic.thumbnail.path +
                            "." +
                            comic.thumbnail.extension
                          }
                          alt="image du comics "
                        />

                        {/* BOUTON DE FAVORI */}

                        {token &&
                          comic._id &&
                          (foundFavoriteComic ? (
                            <button
                              className="comic-button-star-captain"
                              onClick={(event) => {
                                event.stopPropagation();
                                removeComicToFavorite(
                                  comic._id,
                                  foundFavoriteComicIndex
                                );
                              }}>
                              <span className="metal-star-wrapper">
                                <img src={etoileLogo} alt="" />
                              </span>
                            </button>
                          ) : (
                            <button
                              className="comic-button-register "
                              onClick={(event) => {
                                event.stopPropagation();
                                addComicToFavorite(comic._id);
                              }}>
                              Ajouter
                            </button>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Pagination
                skip={skip}
                setSkip={setSkip}
                comicsData={comicsData}
              />
            </div>
          </div>
        )}
        <Modal
          tempData={tempData}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          token={token}
          favoritesTab={favoritesTab}
          setFavoritesTab={setFavoritesTab}
        />
      </main>
    </>
  );
};

export default Comics;
