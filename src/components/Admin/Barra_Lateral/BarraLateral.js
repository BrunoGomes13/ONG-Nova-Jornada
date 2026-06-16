import { NavLink, useNavigate } from "react-router-dom";
import "./BarraLateral.css";

/* ── Itens do menu de navegação ── */
const itensMenu = [
  { caminho: "/adm/dashboard", rotulo: "Dashboard" },
  { caminho: "/adm/animais", rotulo: "Animais" },
  { caminho: "/adm/projetos", rotulo: "Projetos" },
  { caminho: "/adm/usuarios", rotulo: "Usuários" },
  { caminho: "/adm/relatos", rotulo: "Relatos" },
  { caminho: "/adm/contatos", rotulo: "Contatos" },
];

const BarraLateral = () => {
  const navegar = useNavigate();

  /* ── Função de logout ── */
  const handleSair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navegar("/");
  };

  return (
    <aside className="barra-lateral">
      {/* ── Logo / Cabeçalho da barra ── */}
      <div className="barra-lateral__logo">
        <div className="barra-lateral__logo-interno">
          <div className="barra-lateral__logo-icone">🐾</div>
          <div className="barra-lateral__logo-textos">
            <span className="barra-lateral__logo-titulo">Nova Jornada</span>
            <span className="barra-lateral__logo-subtitulo">Painel Admin</span>
          </div>
        </div>
      </div>

      {/* ── Navegação principal ── */}
      <nav className="barra-lateral__navegacao">
        <span className="barra-lateral__rotulo-secao">Menu Principal</span>

        {itensMenu.map((item) => (
          <NavLink
            key={item.caminho}
            to={item.caminho}
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

      {/* ── Botão de sair ── */}
      <div className="barra-lateral__rodape">
        <button className="barra-lateral__botao-sair" onClick={handleSair}>
          <span className="barra-lateral__link-texto">Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default BarraLateral;
