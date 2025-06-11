import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ icon, title }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="global-header-box container">
        <div
          className="header-logo-box"
          onClick={() => {
            navigate("/home");
          }}>
          <img src={icon} alt="logo" />
        </div>

        <h1>{title}</h1>
      </div>
    </header>
  );
};

export default Header;
