import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ComicsByCharacters.css";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";

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

  const { comics, name, thumbnail: avatar, id } = heroeData;

  console.log(tempData);

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

  return (
    <>
      <Navbar token={token} setToken={setToken} />

      {isLoading ? (
        <p className="loading-box">Chargement en cours... </p>
      ) : (
        <main className="ComicsByCharacters-main">
          <div className="container">
            <div className="avatar-box">
              <h1>{name}</h1>
              <div className="avatar-picture-box">
                <img
                  src={avatar.path + "." + avatar.extension}
                  alt="avatar du héro"
                />
              </div>
              <h2>
                Comics dans lesquels vous pourrez retrouver{" "}
                <span className="weight">{name}</span>{" "}
              </h2>
            </div>
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
                          comic.thumbnail.path + "." + comic.thumbnail.extension
                        }
                        alt="photo du comic"
                      />
                    </div>
                  </div>
                );
              })}
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

export default ComicsByCharacters;
