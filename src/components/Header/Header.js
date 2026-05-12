import "./Header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="cabecalho">
      <div className="logo">
        <span className="material-symbols-outlined">pets</span>
        <div>
          <span>ONG Nova Jornada Animal</span>
          <p>Proteção animal</p>
        </div>
      </div>
      <nav className="menu-navegacao" aria-label="Menu-Principal">
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/quem-somos">Quem Somos</Link></li>
          <li><Link to="/projetos">Projetos</Link></li>
          <li><Link to="/animais">Animais</Link></li>
          <li><Link to="/relatos">Relatos</Link></li>
          <li><Link to="/contato">Contato</Link></li>
        </ul>
      </nav>
      <div className="acoes-usuario">
        <button className="btn-login" ><span className="material-symbols-outlined">login</span>Entrar</button>
        <button className="btn-adotar" ><span className="material-symbols-outlined">favorite</span>Adote-me</button>
      </div>
    </header>
  );
}

export default Header;