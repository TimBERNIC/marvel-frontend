import "./Modal.css";
import axios from "axios";
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { useState } from "react";
import etoileLogo from "../../assets/img/etoileLogo.png";

const Modal = ({
  tempData,
  isVisible,
  setIsVisible,
  token,
  favoritesTab,
  setFavoritesTab,
}) => {
  const { picture, title, description, comicId } = tempData;

  console.log(favoritesTab);
  console.log(comicId);

  const foundFavorite = favoritesTab.find((favoriteComic) => {
    return favoriteComic.comicId === comicId;
  });
  const foundFavoriteIndex = favoritesTab.findIndex((favoriteComic) => {
    return favoriteComic.comicId === comicId;
  });

  const addToFavorite = async () => {
    try {
      const response = await axios.put(
        `https://site--marvelproject-backend--cp75xnbbqn97.code.run/user/favorite/add?id=${comicId}`,
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

  const removeToFavorite = async () => {
    try {
      const response = await axios.put(
        `https://site--marvelproject-backend--cp75xnbbqn97.code.run/user/favorite/remove?id=${comicId}`,
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

  if (isVisible) {
    document.body.classList.add("noscroll");
  } else {
    document.body.classList.remove("noscroll");
  }

  return (
    <>
      {isVisible && (
        <div className="comic-modal-box">
          <div className="comic-modal-content">
            <button
              className="closemodal-button"
              onClick={() => {
                setIsVisible(!isVisible);
              }}>
              X
            </button>
            <div className="comic-modal-picture-box">
              <img src={picture} alt="photo du comic" />
            </div>
            <div className="modal-info-box">
              <h3 className="modal-info-title-box">
                {title
                  ? title
                  : `A super adventure where you can find your favorite heroes`}
              </h3>
              <p className="modal-info-description-box">
                {description
                  ? description
                  : `A super adventure where you can find your favorite heroes`}
              </p>
            </div>

            <p className="favorite-button-text">
              Cliquez pour ajouter en favoris!
            </p>
            {foundFavorite ? (
              <button
                className="favorite-button-star-captain"
                onClick={removeToFavorite}>
                <span className="metal-star-wrapper">
                  <img src={etoileLogo} alt="" />
                  {/* <MdOutlineStar
                    border="solid 2px black"
                    className="metal-star"
                  /> */}
                </span>
              </button>
            ) : (
              <button className="favorite-button-star " onClick={addToFavorite}>
                <MdOutlineStarBorder />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
