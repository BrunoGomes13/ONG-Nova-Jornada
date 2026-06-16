import { useState, useEffect } from "react";
import { getProjetos, criarProjeto, atualizarProjeto, deletarProjeto } from "../../../services/adminApi";
import "./Projetos.css";

const estadoInicialFormulario = { titulo: "", descricao: "", objetivo: "", imagem: "", ativo: true };

const Projetos = () => {
  const [listaProjetos, setListaProjetos]       = useState([]);
  const [carregando, setCarregando]             = useState(true);
  const [modalAberto, setModalAberto]           = useState(false);
  const [projetoEditando, setProjetoEditando]   = useState(null);
  const [dadosFormulario, setDadosFormulario]   = useState(estadoInicialFormulario);
  const [mensagemErro, setMensagemErro]         = useState("");
  const [salvando, setSalvando]                 = useState(false);

  useEffect(() => { carregarProjetos(); }, []);

  const carregarProjetos = async () => {
    try {
      setCarregando(true);
      const dados = await getProjetos();
      setListaProjetos(dados || []);
    } catch { setMensagemErro("Erro ao carregar projetos."); }
    finally { setCarregando(false); }
  };

  const abrirModalNovo = () => {
    setProjetoEditando(null);
    setDadosFormulario(estadoInicialFormulario);
    setMensagemErro("");
    setModalAberto(true);
  };

  const abrirModalEditar = (projeto) => {
    setProjetoEditando(projeto);
    setDadosFormulario({
      titulo:    projeto.titulo    || "",
      descricao: projeto.descricao || "",
      objetivo:  projeto.objetivo  || "",
      imagem:    projeto.imagem    || "",
      ativo:     projeto.ativo !== undefined ? projeto.ativo : true,
    });
    setMensagemErro("");
    setModalAberto(true);
  };

  const handleCampoAlterado = (e) => {
    const { name, value, type, checked } = e.target;
    setDadosFormulario((ant) => ({ ...ant, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSalvar = async () => {
    if (!dadosFormulario.titulo) { setMensagemErro("Título é obrigatório."); return; }
    try {
      setSalvando(true);
      if (projetoEditando) {
        await atualizarProjeto(projetoEditando._id, dadosFormulario);
      } else {
        await criarProjeto(dadosFormulario);
      }
      await carregarProjetos();
      setModalAberto(false);
    } catch (erro) {
      setMensagemErro(erro.message || "Erro ao salvar projeto.");
    } finally { setSalvando(false); }
  };

  const handleDeletar = async (id) => {
    if (!window.confirm("Deseja remover este projeto?")) return;
    try { await deletarProjeto(id); await carregarProjetos(); }
    catch { alert("Erro ao deletar projeto."); }
  };

  return (
    <div className="pagina-projetos">
      <div className="pagina-projetos__topo">
        <h2 className="pagina-projetos__titulo">Projetos</h2>
        <button className="pagina-projetos__botao-novo" onClick={abrirModalNovo}>＋ Novo Projeto</button>
      </div>

      <div className="pagina-projetos__tabela-wrapper">
        {carregando ? (
          <p className="pagina-projetos__vazio">Carregando...</p>
        ) : (
          <table className="pagina-projetos__tabela">
            <thead>
              <tr><th>Título</th><th>Objetivo</th><th>Status</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {listaProjetos.length === 0 ? (
                <tr><td colSpan={4}><p className="pagina-projetos__vazio">Nenhum projeto cadastrado.</p></td></tr>
              ) : (
                listaProjetos.map((projeto) => (
                  <tr key={projeto._id}>
                    <td>{projeto.titulo}</td>
                    <td>{projeto.objetivo || "—"}</td>
                    <td>
                      <span className={`pagina-projetos__tag pagina-projetos__tag--${projeto.ativo ? "ativo" : "inativo"}`}>
                        {projeto.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td>
                      <div className="pagina-projetos__acoes">
                        <button className="pagina-projetos__botao-editar" onClick={() => abrirModalEditar(projeto)}>✏️ Editar</button>
                        <button className="pagina-projetos__botao-deletar" onClick={() => handleDeletar(projeto._id)}>🗑️ Deletar</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalAberto && (
        <div className="pagina-projetos__modal-fundo" onClick={() => setModalAberto(false)}>
          <div className="pagina-projetos__modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="pagina-projetos__modal-titulo">
              {projetoEditando ? "✏️ Editar Projeto" : "➕ Novo Projeto"}
            </h3>
            {mensagemErro && <p className="pagina-projetos__erro">{mensagemErro}</p>}
            <div className="pagina-projetos__formulario">
              <div className="pagina-projetos__grupo">
                <label className="pagina-projetos__label">Título *</label>
                <input className="pagina-projetos__input" name="titulo" value={dadosFormulario.titulo} onChange={handleCampoAlterado} placeholder="Ex: Castração Solidária" />
              </div>
              <div className="pagina-projetos__grupo">
                <label className="pagina-projetos__label">Objetivo</label>
                <input className="pagina-projetos__input" name="objetivo" value={dadosFormulario.objetivo} onChange={handleCampoAlterado} placeholder="Objetivo do projeto" />
              </div>
              <div className="pagina-projetos__grupo">
                <label className="pagina-projetos__label">Descrição</label>
                <textarea className="pagina-projetos__textarea" name="descricao" value={dadosFormulario.descricao} onChange={handleCampoAlterado} placeholder="Descreva o projeto..." />
              </div>
              <div className="pagina-projetos__grupo">
                <label className="pagina-projetos__label">URL da Imagem</label>
                <input className="pagina-projetos__input" name="imagem" value={dadosFormulario.imagem} onChange={handleCampoAlterado} placeholder="https://..." />
              </div>
              <div className="pagina-projetos__grupo">
                <label className="pagina-projetos__label">Status</label>
                <select className="pagina-projetos__select" name="ativo" value={dadosFormulario.ativo} onChange={handleCampoAlterado}>
                  <option value={true}>Ativo</option>
                  <option value={false}>Inativo</option>
                </select>
              </div>
            </div>
            <div className="pagina-projetos__modal-rodape">
              <button className="pagina-projetos__botao-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
              <button className="pagina-projetos__botao-salvar" onClick={handleSalvar} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar Projeto"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projetos;
