import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Welcome from "./routes/welcome/Welcome";
import Home from "./routes/home/Home";
import Comics from "./routes/comics/Comics";
import ComicsByCharacters from "./routes/comics/ComicsByCharacters";
import Favorites from "./routes/favorites/Favorites";
import Login from "./routes/login/Login";

import Footer from "./components/footer/Footer";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/home" element={<Home token={token} />}></Route>
          <Route path="/comics" element={<Comics />}></Route>
          <Route path="/:d/comics" element={<ComicsByCharacters />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/Login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
