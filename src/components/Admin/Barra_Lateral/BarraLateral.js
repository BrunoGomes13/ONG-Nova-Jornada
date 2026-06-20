import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./BarraLateral.css";

const itensMenu = [
  { caminho: "/adm/dashboard",  rotulo: "Dashboard" },
  { caminho: "/adm/animais",    rotulo: "Animais"   },
  { caminho: "/adm/projetos",   rotulo: "Projetos"  },
  { caminho: "/adm/usuarios",   rotulo: "Usuários"  },
  { caminho: "/adm/relatos",    rotulo: "Relatos"   },
  { caminho: "/adm/contatos",   rotulo: "Contatos"  },
];

const BarraLateral = () => {
  const navegar = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  const handleSair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navegar("/");
  };

  return (
    <>
      {/* ── Botão hamburguer igual ao do Header público ── */}
      <button className="barra-lateral__btn-hamburger" onClick={toggleMenu}>
        <span className="material-symbols-outlined">
          {menuAberto ? "close" : "menu"}
        </span>
      </button>

      {/* ── Overlay ao abrir no mobile ── */}
      {menuAberto && (
        <div className="barra-lateral__overlay" onClick={fecharMenu} />
      )}

      {/* ── Barra lateral ── */}
      <aside className={`barra-lateral ${menuAberto ? "barra-lateral--aberta" : ""}`}>

        <div className="barra-lateral__logo">
          <div className="barra-lateral__logo-interno">
            <div className="barra-lateral__logo-icone">🐾</div>
            <div className="barra-lateral__logo-textos">
              <span className="barra-lateral__logo-titulo">ONG Nova Jornada</span>
              <span className="barra-lateral__logo-subtitulo">Painel Admin</span>
            </div>
          </div>
        </div>

        <nav className="barra-lateral__navegacao">
          <span className="barra-lateral__rotulo-secao">Menu Principal</span>
          {itensMenu.map((item) => (
            <NavLink
              key={item.caminho}
              to={item.caminho}
              onClick={fecharMenu}
              className={({ isActive }) =>
                isActive
                  ? "barra-lateral__link barra-lateral__link--ativo"
                  : "barra-lateral__link"
              }
            >
              <span className="barra-lateral__link-icone">{item.icone}</span>
              <span className="barra-lateral__link-texto">{item.rotulo}</span>
            </NavLink>
          ))}
        </nav>

        <div className="barra-lateral__rodape">
          <button className="barra-lateral__botao-sair" onClick={handleSair}>
            <span className="barra-lateral__link-texto">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default BarraLateral;
