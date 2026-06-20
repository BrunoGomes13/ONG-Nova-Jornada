import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function Header() {
  const [menuAberto, setMenuAberto]         = useState(false);
  const [scrollAtivo, setScrollAtivo]       = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [usuarioLogado, setUsuarioLogado]   = useState(null);

  const navegar     = useNavigate();
  const dropdownRef = useRef(null);

  /* ── Lê usuário do localStorage ── */
  const lerUsuario = () => {
    const dados = localStorage.getItem("usuario");
    setUsuarioLogado(dados ? JSON.parse(dados) : null);
  };

  useEffect(() => {
    /* ── Lê ao montar ── */
    lerUsuario();

    /* ── Escuta evento customizado disparado após login/logout ── */
    window.addEventListener("usuarioAtualizado", lerUsuario);
    return () => window.removeEventListener("usuarioAtualizado", lerUsuario);
  }, []);

  /* ── Scroll ── */
  useEffect(() => {
    const handleScroll = () => setScrollAtivo(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Fecha dropdown ao clicar fora ── */
  useEffect(() => {
    const handleClickFora = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  /* ── Logout ── */
  const handleSair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuarioLogado(null);
    setDropdownAberto(false);
    setMenuAberto(false);
    /* ── Dispara evento para atualizar outros componentes ── */
    window.dispatchEvent(new Event("usuarioAtualizado"));
    navegar("/");
  };

  const inicialAvatar = usuarioLogado?.nome
    ? usuarioLogado.nome.charAt(0).toUpperCase()
    : "U";

  return (
    <header className={`cabecalho ${scrollAtivo ? "scroll" : ""}`}>

      {/* ── Logo ── */}
      <div className="logo">
        <Link to="/"><span className="material-symbols-outlined">pets</span></Link>
        <div>
          <span>ONG Nova Jornada Animal</span>
          <p>Proteção animal</p>
        </div>
      </div>

      {/* ── Botão hamburguer ── */}
      <button className="btn-hamburger" onClick={() => setMenuAberto(!menuAberto)}>
        <span className="material-symbols-outlined">
          {menuAberto ? "close" : "menu"}
        </span>
      </button>

      {/* ── Navegação ── */}
      <nav className={`menu-navegacao animacao ${menuAberto ? "ativo" : ""}`} aria-label="Menu-Principal">
        <ul>
          <li><Link to="/"           onClick={() => setMenuAberto(false)}>Início</Link></li>
          <li><Link to="/quem-somos" onClick={() => setMenuAberto(false)}>Quem Somos</Link></li>
          <li><Link to="/projetos"   onClick={() => setMenuAberto(false)}>Projetos</Link></li>
          <li><Link to="/animais"    onClick={() => setMenuAberto(false)}>Animais</Link></li>
          <li><Link to="/relatos"    onClick={() => setMenuAberto(false)}>Relatos</Link></li>
          <li><Link to="/contato"    onClick={() => setMenuAberto(false)}>Contato</Link></li>

          {/* ── Mobile: opções do usuário logado ──
          {usuarioLogado && (
            <li className="menu-mobile-usuario">
              <span className="menu-mobile-nome">{usuarioLogado.nome}</span>
              {usuarioLogado.role === "admin" && (
                <Link to="/adm/dashboard" onClick={() => setMenuAberto(false)}>
                  Painel Admin
                </Link>
              )}
              <button className="menu-mobile-sair" onClick={handleSair}>
                <span className="material-symbols-outlined">logout</span> Sair
              </button>
            </li>
          )} */}
        </ul>
      </nav>

      {/* ── Ações à direita ── */}
      <div className="acoes-usuario">
        {usuarioLogado ? (
          /* ── Usuário logado: avatar + dropdown ── */
          <div className="header-perfil" ref={dropdownRef}>
            <button
              className="header-avatar"
              onClick={() => setDropdownAberto(!dropdownAberto)}
              title={usuarioLogado.nome}
            >
              {inicialAvatar}
            </button>
            {/* <span className="header-nome-usuario">{usuarioLogado.nome}</span> */}

            {dropdownAberto && (
              <div className="header-dropdown">
                <div className="header-dropdown__info">
                  <strong>{usuarioLogado.nome}</strong>
                  <span>{usuarioLogado.email}</span>
                </div>
                <div className="header-dropdown__divisor" />
                <Link to="/animais" className="header-dropdown__item" onClick={() => setDropdownAberto(false)}>
                  <span className="material-symbols-outlined">favorite</span>
                  Quero adotar
                </Link>
                {usuarioLogado.role === "admin" && (
                  <Link to="/adm/dashboard" className="header-dropdown__item" onClick={() => setDropdownAberto(false)}>
                    <span className="material-symbols-outlined">dashboard</span>
                    Painel Admin
                  </Link>
                )}
                <div className="header-dropdown__divisor" />
                <button className="header-dropdown__sair" onClick={handleSair}>
                  <span className="material-symbols-outlined">logout</span>
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ── Não logado: botões Entrar e Adote-me ── */
          <>
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
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
