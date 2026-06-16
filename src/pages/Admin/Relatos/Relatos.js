import { useState, useEffect } from "react";
import "./Relatos.css";

/* ── URL base da API ── */
const URL_API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* ── Token JWT do admin ── */
const pegarToken = () => localStorage.getItem("token");

const montarCabecalhos = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${pegarToken()}`,
});

/* ── Estado inicial do formulário ── */
const estadoInicial = { nome: "", animal: "", relato: "", imagem: "" };

const RelatosAdmin = () => {
  const [listaRelatos, setListaRelatos]     = useState([]);
  const [carregando, setCarregando]         = useState(true);
  const [modalAberto, setModalAberto]       = useState(false);
  const [relatoEditando, setRelatoEditando] = useState(null);
  const [formulario, setFormulario]         = useState(estadoInicial);
  const [mensagemErro, setMensagemErro]     = useState("");
  const [salvando, setSalvando]             = useState(false);

  /* ── Carrega relatos da API ── */
  useEffect(() => { carregarRelatos(); }, []);

  const carregarRelatos = async () => {
    try {
      setCarregando(true);
      const resposta = await fetch(`${URL_API}/relatos`);
      const dados = await resposta.json();
      setListaRelatos(Array.isArray(dados) ? dados : []);
    } catch {
      setMensagemErro("Erro ao carregar relatos.");
    } finally {
      setCarregando(false);
    }
  };

  /* ── Abre modal para novo relato ── */
  const abrirModalNovo = () => {
    setRelatoEditando(null);
    setFormulario(estadoInicial);
    setMensagemErro("");
    setModalAberto(true);
  };

  /* ── Abre modal para editar relato ── */
  const abrirModalEditar = (relato) => {
    setRelatoEditando(relato);
    setFormulario({
      nome:   relato.nome   || "",
      animal: relato.animal || "",
      relato: relato.relato || "",
      imagem: relato.imagem || "",
    });
    setMensagemErro("");
    setModalAberto(true);
  };

  /* ── Atualiza campo do formulário ── */
  const handleCampo = (e) => {
    const { name, value } = e.target;
    setFormulario((ant) => ({ ...ant, [name]: value }));
  };

  /* ── Salva (cria ou atualiza) ── */
  const handleSalvar = async () => {
    if (!formulario.nome || !formulario.animal || !formulario.relato) {
      setMensagemErro("Nome, animal e relato são obrigatórios.");
      return;
    }
    try {
      setSalvando(true);

      if (relatoEditando) {
        /* ── Atualiza relato existente ── */
        await fetch(`${URL_API}/relatos/${relatoEditando._id}`, {
          method:  "PUT",
          headers: montarCabecalhos(),
          body:    JSON.stringify(formulario),
        });
      } else {
        /* ── Cria novo relato ── */
        await fetch(`${URL_API}/relatos`, {
          method:  "POST",
          headers: montarCabecalhos(),
          body:    JSON.stringify(formulario),
        });
      }

      await carregarRelatos();
      setModalAberto(false);
    } catch {
      setMensagemErro("Erro ao salvar relato.");
    } finally {
      setSalvando(false);
    }
  };

  /* ── Deleta relato ── */
  const handleDeletar = async (id) => {
    if (!window.confirm("Deseja remover este relato?")) return;
    try {
      await fetch(`${URL_API}/relatos/${id}`, {
        method:  "DELETE",
        headers: montarCabecalhos(),
      });
      await carregarRelatos();
    } catch {
      alert("Erro ao deletar relato.");
    }
  };

  /* ── Formata data ── */
  const formatarData = (dataISO) =>
    dataISO ? new Date(dataISO).toLocaleDateString("pt-BR") : "—";

  return (
    <div className="pagina-tabela-simples">
      {/* ── Topo ── */}
      <div className="pagina-tabela-simples__topo">
        <h2 className="pagina-tabela-simples__titulo">Relatos de Adoção</h2>
        <button className="pagina-tabela-simples__botao-novo" onClick={abrirModalNovo}>
          ＋ Novo Relato
        </button>
      </div>

      {/* ── Tabela ── */}
      <div className="pagina-tabela-simples__wrapper">
        {carregando ? (
          <p className="pagina-tabela-simples__vazio">Carregando...</p>
        ) : (
          <table className="pagina-tabela-simples__tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Animal</th>
                <th>Relato</th>
                <th>Cadastrado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaRelatos.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <p className="pagina-tabela-simples__vazio">
                      Nenhum relato cadastrado ainda.
                    </p>
                  </td>
                </tr>
              ) : (
                listaRelatos.map((relato) => (
                  <tr key={relato._id}>
                    <td>{relato.nome}</td>
                    <td>{relato.animal}</td>
                    <td style={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {relato.relato}
                    </td>
                    <td>{formatarData(relato.createdAt)}</td>
                    <td>
                      <div className="pagina-tabela-simples__acoes">
                        <button
                          className="pagina-tabela-simples__botao-editar"
                          onClick={() => abrirModalEditar(relato)}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="pagina-tabela-simples__botao-deletar"
                          onClick={() => handleDeletar(relato._id)}
                        >
                          🗑️ Deletar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Modal de criação/edição ── */}
      {modalAberto && (
        <div className="pagina-relatos__modal-fundo" onClick={() => setModalAberto(false)}>
          <div className="pagina-relatos__modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="pagina-relatos__modal-titulo">
              {relatoEditando ? "✏️ Editar Relato" : "➕ Novo Relato"}
            </h3>

            {mensagemErro && (
              <p className="pagina-relatos__erro">{mensagemErro}</p>
            )}

            <div className="pagina-relatos__formulario">
              <div className="pagina-relatos__grupo-linha">
                <div className="pagina-relatos__grupo">
                  <label className="pagina-relatos__label">Nome do adotante *</label>
                  <input
                    className="pagina-relatos__input"
                    name="nome"
                    value={formulario.nome}
                    onChange={handleCampo}
                    placeholder="Ex: Maria Clara"
                  />
                </div>
                <div className="pagina-relatos__grupo">
                  <label className="pagina-relatos__label">Nome do animal *</label>
                  <input
                    className="pagina-relatos__input"
                    name="animal"
                    value={formulario.animal}
                    onChange={handleCampo}
                    placeholder="Ex: Thor"
                  />
                </div>
              </div>

              <div className="pagina-relatos__grupo">
                <label className="pagina-relatos__label">Relato *</label>
                <textarea
                  className="pagina-relatos__textarea"
                  name="relato"
                  value={formulario.relato}
                  onChange={handleCampo}
                  placeholder="Escreva o depoimento do adotante..."
                />
              </div>

              <div className="pagina-relatos__grupo">
                <label className="pagina-relatos__label">URL da foto do adotante</label>
                <input
                  className="pagina-relatos__input"
                  name="imagem"
                  value={formulario.imagem}
                  onChange={handleCampo}
                  placeholder="https://i.imgur.com/..."
                />
              </div>
            </div>

            <div className="pagina-relatos__modal-rodape">
              <button
                className="pagina-relatos__botao-cancelar"
                onClick={() => setModalAberto(false)}
              >
                Cancelar
              </button>
              <button
                className="pagina-relatos__botao-salvar"
                onClick={handleSalvar}
                disabled={salvando}
              >
                {salvando ? "Salvando..." : "Salvar Relato"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatosAdmin;