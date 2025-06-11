import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import marvelLogo from "../../assets/img/Marvel-logo.png";

const Comics = ({ token }) => {
  return (
    <>
      <Header icon={marvelLogo} />
      <Navbar token={token} />
      <main>
        <div className="container">CECI EST LA PAGE COMICS</div>
      </main>
    </>
  );
};

export default Comics;
