import "./Header.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrollAtivo, setScrollAtivo] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollAtivo(true);
      } else {
        setScrollAtivo(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`cabecalho ${scrollAtivo ? "scroll" : ""}`}>
      <div className="logo">
        <Link to="/"><span className="material-symbols-outlined">pets</span></Link>
        <div>
          <span>ONG Nova Jornada Animal</span>
          <p>Proteção animal</p>
        </div>
      </div>

      <button className="btn-hamburger" onClick={toggleMenu}>
        <span className="material-symbols-outlined">
          {menuAberto ? "close" : "menu"}
        </span>
      </button>

      <nav
        className={`menu-navegacao animacao ${
          menuAberto ? "ativo" : ""
        }`}
        aria-label="Menu-Principal"
      >
        <ul>
          <li>
            <Link to="/" onClick={() => setMenuAberto(false)}>
              Início
            </Link>
          </li>

          <li>
            <Link to="/quem-somos" onClick={() => setMenuAberto(false)}>
              Quem Somos
            </Link>
          </li>

          <li>
            <Link to="/projetos" onClick={() => setMenuAberto(false)}>
              Projetos
            </Link>
          </li>

          <li>
            <Link to="/animais" onClick={() => setMenuAberto(false)}>
              Animais
            </Link>
          </li>

          <li>
            <Link to="/relatos" onClick={() => setMenuAberto(false)}>
              Relatos
            </Link>
          </li>

          <li>
            <Link to="/contato" onClick={() => setMenuAberto(false)}>
              Contato
            </Link>
          </li>
        </ul>
      </nav>

      <div className="acoes-usuario">
        <Link to="/login">
        <button className="btn-login">
          <span className="material-symbols-outlined">login</span>
          Entrar
        </button>
        </Link>

        <Link to="/animais">
          <button className="btn-adotar">
            <span className="material-symbols-outlined">favorite</span>
            Adote-me
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;