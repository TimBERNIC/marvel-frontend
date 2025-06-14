import Navbar from "../../components/navbar/Navbar";
import "./Comics.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";
import Modal from "../../components/modal/Modal";

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
  const [comicslimit, setComicslimit] = useState(10);
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
                      <div className="image-comic-box">
                        <img
                          src={
                            comic.thumbnail.path +
                            "." +
                            comic.thumbnail.extension
                          }
                          alt="image du comics "
                        />
                      </div>
                      <div className="comics-details-box">
                        <h3>{comic.title ? comic.title : "Unknown title"}</h3>
                        <p className="comics-details-text-box">
                          {comic.description
                            ? comic.description
                            : "A superhero like no other, but to find out, read his adventures!!"}
                        </p>
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
