import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Welcome from "./routes/welcome/Welcome";
import Home from "./routes/home/Home";
import Comics from "./routes/comics/Comics";
import ComicsByCharacters from "./routes/comicsbycharacters/ComicsByCharacters";
import Favorites from "./routes/favorites/Favorites";
import Login from "./routes/login/Login";
import marvelLogo from "./assets/img/Marvel-logo.png";
import Cookies from "js-cookie";
import axios from "axios";

const App = () => {
  const [token, setToken] = useState(Cookies.get("marvelTok") || null);
  const [userId, setUserId] = useState(null);
  const [favoritesTab, setFavoritesTab] = useState([]);
  const [userName, setUserName] = useState("");
  const [searchingName, setSearchingName] = useState("");
  const [searchingTitle, setSearchingTitle] = useState("");

  //Récupération des données utilisateur si token présent.
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(
            `https://site--marvelproject-backend--cp75xnbbqn97.code.run/user`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          setUserName(response.data.username);
          setUserId(response.data._id);
          setFavoritesTab(response.data.favorites);
        } else {
          return console.log("no token, not registered");
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [userId, token, favoritesTab, userName]);

  return (
    <>
      <Router>
        <Header
          icon={marvelLogo}
          searchingName={searchingName}
          setSearchingName={setSearchingName}
          searchingTitle={searchingTitle}
          setSearchingTitle={setSearchingTitle}
          token={token}
          setToken={setToken}
          userId={userId}
          setUserId={setUserId}
          userName={userName}
          setUserName={setUserName}
          setFavoritesTab={setFavoritesTab}
        />
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route
            path="/home"
            element={
              <Home
                token={token}
                setToken={setToken}
                searchingName={searchingName}
                setSearchingName={setSearchingName}
                userId={userId}
                setUserId={setUserId}
                userName={userName}
                setUserName={setUserName}
                favoritesTab={favoritesTab}
                setFavoritesTab={setFavoritesTab}
              />
            }></Route>
          <Route
            path="/comics"
            element={
              <Comics
                token={token}
                setToken={setToken}
                searchingTitle={searchingTitle}
                setSearchingTitle={setSearchingTitle}
                userId={userId}
                setUserId={setUserId}
                userName={userName}
                setUserName={setUserName}
                favoritesTab={favoritesTab}
                setFavoritesTab={setFavoritesTab}
              />
            }></Route>
          <Route
            path="/:id/comics"
            element={
              <ComicsByCharacters
                token={token}
                setToken={setToken}
                favoritesTab={favoritesTab}
                setFavoritesTab={setFavoritesTab}
              />
            }></Route>
          <Route
            path="/favorites"
            element={
              <Favorites
                token={token}
                setToken={setToken}
                userId={userId}
                setUserId={setUserId}
                userName={userName}
                setUserName={setUserName}
                favoritesTab={favoritesTab}
                setFavoritesTab={setFavoritesTab}
              />
            }></Route>
          <Route
            path="/Login"
            element={
              <Login
                token={token}
                setToken={setToken}
                setUserId={setUserId}
                userName={userName}
                setUserName={setUserName}
              />
            }></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
