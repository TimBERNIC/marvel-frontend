import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import marvelLogo from "../../assets/img/Marvel-logo.png";

const Favorites = ({ token }) => {
  return (
    <>
      <Header icon={marvelLogo} />
      <Navbar token={token} />
      <main>
        <div className="container">CECI EST LA PAGE FAVORITE</div>
      </main>
    </>
  );
};

export default Favorites;
