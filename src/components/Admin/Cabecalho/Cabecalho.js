import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Cabecalho.css";

/* ── Mapeamento de rotas para títulos de página ── */
const mapaRotulosPaginas = {
  "/adm/dashboard": "Dashboard",
  "/adm/animais":   "Gerenciar Animais",
  "/adm/projetos":  "Gerenciar Projetos",
  "/adm/usuarios":  "Gerenciar Usuários",
  "/adm/relatos":   "Relatos",
  "/adm/contatos":  "Contatos",
};

const Cabecalho = () => {
  const localizacao = useLocation();
  const [textoPesquisa, setTextoPesquisa] = useState("");

  /* ── Dados do usuário logado ── */
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "{}");
  const nomeUsuario   = usuarioLogado?.nome  || "Administrador";
  const emailUsuario  = usuarioLogado?.email || "admin@novajornada.com";

  /* ── Inicial do avatar ── */
  const inicialAvatar = nomeUsuario.charAt(0).toUpperCase();

  /* ── Título da página atual ── */
  const tituloPagina = mapaRotulosPaginas[localizacao.pathname] || "Painel";

  return (
    <header className="cabecalho">
      {/* ── Título da página atual ── */}
      <h1 className="cabecalho__titulo-pagina">{tituloPagina}</h1>

      {/* ── Campo de pesquisa ── */}
      <div className="cabecalho__campo-pesquisa">
        <span className="cabecalho__icone-pesquisa">🔍</span>
        <input
          type="text"
          className="cabecalho__input-pesquisa"
          placeholder="Pesquisar..."
          value={textoPesquisa}
          onChange={(e) => setTextoPesquisa(e.target.value)}
        />
      </div>

      {/* ── Ações à direita ── */}
      <div className="cabecalho__acoes">
        {/* ── Notificações ── */}
        <button className="cabecalho__botao-notificacoes" title="Notificações">
          🔔
          <span className="cabecalho__contador-notificacoes">3</span>
        </button>

        <div className="cabecalho__divisor" />

        {/* ── Perfil do administrador ── */}
        <div className="cabecalho__perfil">
          <div className="cabecalho__avatar">{inicialAvatar}</div>
          <div className="cabecalho__info-usuario">
            <span className="cabecalho__nome-usuario">{nomeUsuario}</span>
            <span className="cabecalho__email-usuario">{emailUsuario}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Cabecalho;
