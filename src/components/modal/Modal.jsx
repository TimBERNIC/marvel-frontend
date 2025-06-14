import "./Modal.css";
import axios from "axios";
import etoileLogo from "../../assets/img/etoileLogo.png";

const Modal = ({
  tempData,
  isVisible,
  setIsVisible,
  token,
  favoritesTab,
  setFavoritesTab,
}) => {
  const { picture, title, description, comicId, characterId } = tempData;

  const foundFavoriteComic = favoritesTab.find((favoriteComic) => {
    return favoriteComic.comicId === comicId;
  });
  const foundFavoriteComicIndex = favoritesTab.findIndex((favoriteComic) => {
    return favoriteComic.comicId === comicId;
  });

  const addComicToFavorite = async () => {
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

  const removeComicToFavorite = async () => {
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

  const foundCharacterFavorite = favoritesTab.find((favoriteCharacter) => {
    return favoriteCharacter.characterId === characterId;
  });
  const foundCharacterFavoriteIndex = favoritesTab.findIndex(
    (favoriteCharacter) => {
      return favoriteCharacter.characterId === characterId;
    }
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
      copyTab.push({ characterId: characterId });
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
      copyTab.splice(foundCharacterFavoriteIndex, 1);
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
            {comicId &&
              (foundFavoriteComic ? (
                <button
                  className="favorite-button-star-captain"
                  onClick={removeComicToFavorite}>
                  <span className="metal-star-wrapper">
                    <img src={etoileLogo} alt="" />
                  </span>
                </button>
              ) : (
                <button
                  className="favorite-button-register "
                  onClick={addComicToFavorite}>
                  <p className="favorite-button-text">
                    Cliquez pour ajouter en favoris!
                  </p>
                </button>
              ))}

            {characterId &&
              (foundCharacterFavorite ? (
                <button
                  className="favorite-button-star-captain"
                  onClick={removeCharacterToFavorite}>
                  <span className="metal-star-wrapper">
                    <img src={etoileLogo} alt="" />
                  </span>
                </button>
              ) : (
                <button
                  className="favorite-button-register "
                  onClick={addCharacterToFavorite}>
                  <p className="favorite-button-text">
                    Cliquez pour ajouter en favoris!
                  </p>
                </button>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
