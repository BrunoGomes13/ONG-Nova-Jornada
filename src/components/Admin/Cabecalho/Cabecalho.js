import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buscarMeuPerfil } from "../../../services/adminApi";
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
  const [admin, setAdmin] = useState(null);

  /* ── Busca o admin real direto do backend, não do localStorage ──
     Isso garante que o painel sempre mostre quem está realmente
     autenticado como admin, e não o último usuário cadastrado.   ── */
  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const data = await buscarMeuPerfil();
        if (data?.usuario) setAdmin(data.usuario);
      } catch (erro) {
        console.error("Erro ao buscar perfil do admin:", erro);
      }
    };
    carregarPerfil();
  }, []);

  const nomeUsuario  = admin?.nome  || "Administrador";
  const emailUsuario = admin?.email || "";

  /* ── Inicial do avatar ── */
  const inicialAvatar = nomeUsuario.charAt(0).toUpperCase();

  /* ── Título da página atual ── */
  const tituloPagina = mapaRotulosPaginas[localizacao.pathname] || "Painel";

  return (
    <header className="admin-cabecalho">
      {/* ── Título da página atual ── */}
      <h1 className="admin-cabecalho__titulo-pagina">{tituloPagina}</h1>

      {/* ── Campo de pesquisa ── */}
      <div className="admin-cabecalho__campo-pesquisa">
        <span className="admin-cabecalho__icone-pesquisa">🔍</span>
        <input
          type="text"
          className="admin-cabecalho__input-pesquisa"
          placeholder="Pesquisar..."
          value={textoPesquisa}
          onChange={(e) => setTextoPesquisa(e.target.value)}
        />
      </div>

      {/* ── Ações à direita ── */}
      <div className="admin-cabecalho__acoes">

        <div className="admin-cabecalho__divisor" />

        {/* ── Perfil do administrador (dados reais do backend) ── */}
        <div className="admin-cabecalho__perfil">
          <div className="admin-cabecalho__avatar">{inicialAvatar}</div>
          <div className="admin-cabecalho__info-usuario">
            <span className="admin-cabecalho__nome-usuario">{nomeUsuario}</span>
            <span className="admin-cabecalho__email-usuario">{emailUsuario}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Cabecalho;
