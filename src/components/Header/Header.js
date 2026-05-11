import "./Header.css";
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
          <li><a href="/">Início</a></li>
          <li><a href="/quem-somos">Quem Somos</a></li>
          <li><a href="/projetos">Projetos</a></li>
          <li><a href="/animais">Animais</a></li>
          <li><a href="/relatos">Relatos</a></li>
          <li><a href="/contato">Contato</a></li>
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