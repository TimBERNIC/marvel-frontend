import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({
  icon,
  searchingName,
  setSearchingName,
  searchingTitle,
  setSearchingTitle,
  userName,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    location.pathname !== "/" && (
      <header>
        <div className="global-header-box container">
          <div
            className="header-logo-box"
            onClick={() => {
              navigate("/");
            }}>
            <img src={icon} alt="logo" />
          </div>

          <div className="input-box">
            {location.pathname === "/home" ? (
              <input
                className="input-home"
                type="text"
                value={searchingName}
                onChange={(event) => {
                  setSearchingName(event.target.value);
                }}
                placeholder="Rechercher un héros"
              />
            ) : location.pathname === "/comics" ? (
              <input
                className="input-comics"
                type="text"
                value={searchingTitle}
                onChange={(event) => {
                  setSearchingTitle(event.target.value);
                }}
                placeholder="Rechercher un comics"
              />
            ) : null}
            {userName && (
              <div className="welcome-user-box">Bienvenue à toi {userName}</div>
            )}
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
