import { useState, useEffect } from "react";
import { getProjetos, criarProjeto, atualizarProjeto, deletarProjeto } from "../../../services/adminApi";
import "./Projetos.css";

const estadoInicialFormulario = { titulo: "", descricao: "", objetivo: "", imagem: "", ativo: true };

const Toast = ({ mensagem, tipo, visivel, aoFechar }) => {
  useEffect(() => {
    if (!visivel) return;
    const t = setTimeout(aoFechar, 3000);
    return () => clearTimeout(t);
  }, [visivel, aoFechar]);
  if (!visivel) return null;
  const estilos = {
    sucesso: { container: { border:"1px solid rgba(74,222,128,0.3)", color:"#4ade80" }, botao: { color:"#4ade80" } },
    erro:    { container: { border:"1px solid rgba(248,113,113,0.3)", color:"#f87171" }, botao: { color:"#f87171" } },
  };
  const e = estilos[tipo] || estilos.sucesso;
  return (
    <div style={{ position:"fixed", top:24, right:24, zIndex:9999, display:"flex", alignItems:"center", gap:10, padding:"14px 18px", borderRadius:12, minWidth:260, background:"#13161f", boxShadow:"0 8px 32px rgba(0,0,0,0.35)", fontFamily:"Sora,sans-serif", fontSize:13, fontWeight:500, ...e.container }}>
      <span>{tipo === "sucesso" ? "✅" : "❌"}</span>
      <span style={{ flex:1 }}>{mensagem}</span>
      <button onClick={aoFechar} style={{ background:"none", border:"none", cursor:"pointer", opacity:0.6, fontSize:13, ...e.botao }}>✕</button>
    </div>
  );
};

const ModalConfirmar = ({ visivel, mensagem, aoConfirmar, aoCancelar }) => {
  if (!visivel) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:10000, backdropFilter:"blur(4px)" }}>
      <div style={{ background:"#1a1d27", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:28, width:"100%", maxWidth:360, fontFamily:"Sora,sans-serif" }}>
        <p style={{ color:"#ffffff", fontSize:15, fontWeight:600, marginBottom:8 }}>Confirmar exclusão</p>
        <p style={{ color:"rgba(255,255,255,0.5)", fontSize:13, marginBottom:24 }}>{mensagem}</p>
        <div style={{ display:"flex", gap:12, justifyContent:"flex-end" }}>
          <button onClick={aoCancelar} style={{ padding:"9px 18px", background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.6)", border:"none", borderRadius:10, fontFamily:"Sora,sans-serif", fontSize:13, fontWeight:600, cursor:"pointer" }}>Cancelar</button>
          <button onClick={aoConfirmar} style={{ padding:"9px 18px", background:"rgba(248,113,113,0.15)", color:"#f87171", border:"1px solid rgba(248,113,113,0.3)", borderRadius:10, fontFamily:"Sora,sans-serif", fontSize:13, fontWeight:600, cursor:"pointer" }}>🗑️ Remover</button>
        </div>
      </div>
    </div>
  );
};

const Projetos = () => {
  const [listaProjetos, setListaProjetos]     = useState([]);
  const [carregando, setCarregando]           = useState(true);
  const [modalAberto, setModalAberto]         = useState(false);
  const [projetoEditando, setProjetoEditando] = useState(null);
  const [dadosFormulario, setDadosFormulario] = useState(estadoInicialFormulario);
  const [mensagemErro, setMensagemErro]       = useState("");
  const [salvando, setSalvando]               = useState(false);
  const [toast, setToast]                     = useState({ visivel: false, mensagem: "", tipo: "sucesso" });
  const [confirmar, setConfirmar]             = useState({ visivel: false, id: null });

  const mostrarToast = (mensagem, tipo = "sucesso") => setToast({ visivel: true, mensagem, tipo });
  const fecharToast  = () => setToast((t) => ({ ...t, visivel: false }));

  useEffect(() => { carregarProjetos(); }, []);

  const carregarProjetos = async () => {
    try {
      setCarregando(true);
      const dados = await getProjetos();
      setListaProjetos(dados || []);
    } catch { mostrarToast("Erro ao carregar projetos.", "erro"); }
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
      titulo: projeto.titulo || "", descricao: projeto.descricao || "",
      objetivo: projeto.objetivo || "", imagem: projeto.imagem || "",
      ativo: projeto.ativo !== undefined ? projeto.ativo : true,
    });
    setMensagemErro("");
    setModalAberto(true);
  };

  const handleCampoAlterado = (e) => {
    const { name, value } = e.target;
    setDadosFormulario((ant) => ({ ...ant, [name]: value }));
  };

  const handleSalvar = async () => {
    if (!dadosFormulario.titulo) { setMensagemErro("Título é obrigatório."); return; }
    try {
      setSalvando(true);
      if (projetoEditando) {
        await atualizarProjeto(projetoEditando._id, dadosFormulario);
        mostrarToast("Projeto atualizado com sucesso!");
      } else {
        await criarProjeto(dadosFormulario);
        mostrarToast("Projeto criado com sucesso!");
      }
      await carregarProjetos();
      setModalAberto(false);
    } catch (erro) {
      setMensagemErro(erro.message || "Erro ao salvar projeto.");
    } finally { setSalvando(false); }
  };

  const pedirConfirmacaoDeletar = (id) => setConfirmar({ visivel: true, id });

  const confirmarDeletar = async () => {
    try {
      await deletarProjeto(confirmar.id);
      await carregarProjetos();
      mostrarToast("Projeto removido com sucesso!");
    } catch { mostrarToast("Erro ao deletar projeto.", "erro"); }
    finally { setConfirmar({ visivel: false, id: null }); }
  };

  return (
    <div className="pagina-projetos">
      <Toast visivel={toast.visivel} mensagem={toast.mensagem} tipo={toast.tipo} aoFechar={fecharToast} />
      <ModalConfirmar
        visivel={confirmar.visivel}
        mensagem="Deseja remover este projeto? Esta ação não pode ser desfeita."
        aoConfirmar={confirmarDeletar}
        aoCancelar={() => setConfirmar({ visivel: false, id: null })}
      />

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
                        <button className="pagina-projetos__botao-deletar" onClick={() => pedirConfirmacaoDeletar(projeto._id)}>🗑️ Deletar</button>
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
            <h3 className="pagina-projetos__modal-titulo">{projetoEditando ? "✏️ Editar Projeto" : "➕ Novo Projeto"}</h3>
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
