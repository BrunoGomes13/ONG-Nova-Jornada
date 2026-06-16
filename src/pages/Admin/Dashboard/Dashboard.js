import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartaoDashboard from "../../../components/Admin/CartaoDashboard/CartaoDashboard";
import { getDashboard, getAnimais } from "../../../services/adminApi";
import "./Dashboard.css";

/* ── Página principal do painel administrativo ── */
const Dashboard = () => {
  const [dadosDashboard, setDadosDashboard]     = useState(null);
  const [animaisRecentes, setAnimaisRecentes]   = useState([]);
  const [carregando, setCarregando]             = useState(true);

  const usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "{}");
  const nomeUsuario   = usuarioLogado?.nome || "Administrador";
  const horaAtual     = new Date().getHours();

  /* ── Saudação dinâmica por horário ── */
  const saudacao =
    horaAtual < 12 ? "Bom dia" :
    horaAtual < 18 ? "Boa tarde" :
    "Boa noite";

  /* ── Busca de dados reais do backend ── */
  useEffect(() => {
    const buscarDados = async () => {
      try {
        const [dashboard, animais] = await Promise.all([
          getDashboard(),
          getAnimais(),
        ]);
        setDadosDashboard(dashboard);
        /* ── Exibe apenas os 5 animais mais recentes ── */
        setAnimaisRecentes((animais || []).slice(0, 5));
      } catch (erro) {
        console.error("Erro ao buscar dados do dashboard:", erro);
        /* ── Fallback com dados mockados em caso de erro ── */
        setDadosDashboard({
          totalAnimais:       0,
          animaisDisponiveis: 0,
          animaisAdotados:    0,
          totalProjetos:      0,
          usuariosCadastrados:0,
        });
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  /* ── Configuração dos cartões do dashboard ── */
  const configuracoesCartoes = [
    {
      icone:   "🐾",
      rotulo:  "Total de Animais",
      valor:   dadosDashboard?.totalAnimais,
      variacao:"12%",
      cor:     "laranja",
    },
    {
      icone:   "✅",
      rotulo:  "Animais Disponíveis",
      valor:   dadosDashboard?.animaisDisponiveis,
      variacao:"5%",
      cor:     "verde",
    },
    {
      icone:   "🏡",
      rotulo:  "Adotados",
      valor:   dadosDashboard?.animaisAdotados,
      variacao:"8%",
      cor:     "azul",
    },
    {
      icone:   "📁",
      rotulo:  "Projetos Ativos",
      valor:   dadosDashboard?.totalProjetos,
      variacao:"3%",
      cor:     "roxo",
    },
    {
      icone:   "👥",
      rotulo:  "Usuários Cadastrados",
      valor:   dadosDashboard?.usuariosCadastrados,
      variacao:"20%",
      cor:     "amarelo",
    },
  ];

  return (
    <div className="pagina-dashboard">
      {/* ── Saudação ── */}
      <div className="pagina-dashboard__saudacao">
        <h2 className="pagina-dashboard__saudacao-titulo">
          {saudacao}, {nomeUsuario}! 👋
        </h2>
        <p className="pagina-dashboard__saudacao-subtitulo">
          Aqui está o resumo do sistema hoje.
        </p>
      </div>

      {/* ── Grade de cartões ── */}
      {carregando ? (
        <p className="pagina-dashboard__carregando">Carregando dados...</p>
      ) : (
        <div className="pagina-dashboard__grade-cartoes">
          {configuracoesCartoes.map((cartao, indice) => (
            <CartaoDashboard key={indice} {...cartao} />
          ))}
        </div>
      )}

      {/* ── Tabela de animais recentes ── */}
      <div className="pagina-dashboard__secao-tabela">
        <div className="pagina-dashboard__cabecalho-secao">
          <h3 className="pagina-dashboard__titulo-secao">Animais Recentes</h3>
          <Link to="/adm/animais" className="pagina-dashboard__link-ver-todos">
            Ver todos →
          </Link>
        </div>

        {carregando ? (
          <p className="pagina-dashboard__carregando">Carregando animais...</p>
        ) : (
          <table className="pagina-dashboard__tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Espécie</th>
                <th>Raça</th>
                <th>Porte</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {animaisRecentes.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", opacity: 0.4 }}>
                    Nenhum animal cadastrado ainda.
                  </td>
                </tr>
              ) : (
                animaisRecentes.map((animal) => (
                  <tr key={animal._id}>
                    <td>{animal.nome}</td>
                    <td>{animal.especie}</td>
                    <td>{animal.raca || "—"}</td>
                    <td>{animal.porte || "—"}</td>
                    <td>
                      <span
                        className={`pagina-dashboard__tag-status pagina-dashboard__tag-status--${
                          animal.status === "disponivel" ? "disponivel" : "adotado"
                        }`}
                      >
                        {animal.status === "disponivel" ? "● Disponível" : "● Adotado"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
