import "../Footer/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        This exercice was made with
        <span className="footer-caracters"> React </span> by
        <a href="https://github.com/TimBERNIC" className="footer-caracters">
          TimBERNIC
        </a>
        with
        <a href="https://www.lereacteur.io/" className="footer-caracters">
          LE REACTEUR
        </a>
      </div>
    </footer>
  );
};

export default Footer;
