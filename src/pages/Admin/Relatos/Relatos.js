import { useState, useEffect } from "react";
import "./Relatos.css";

const URL_API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const pegarToken = () => localStorage.getItem("token");
const montarCabecalhos = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${pegarToken()}`,
});

const estadoInicial = { nome: "", animal: "", relato: "", imagem: "" };

const Toast = ({ mensagem, tipo, visivel, aoFechar }) => {
  useEffect(() => {
    if (!visivel) return;
    const t = setTimeout(aoFechar, 3000);
    return () => clearTimeout(t);
  }, [visivel, aoFechar]);
  if (!visivel) return null;
  const estilos = {
    sucesso: { border:"1px solid rgba(74,222,128,0.3)", color:"#4ade80" },
    erro:    { border:"1px solid rgba(248,113,113,0.3)", color:"#f87171" },
  };
  const e = estilos[tipo] || estilos.sucesso;
  return (
    <div style={{ position:"fixed", top:24, right:24, zIndex:9999, display:"flex", alignItems:"center", gap:10, padding:"14px 18px", borderRadius:12, minWidth:260, background:"#13161f", boxShadow:"0 8px 32px rgba(0,0,0,0.35)", fontFamily:"Sora,sans-serif", fontSize:13, fontWeight:500, ...e }}>
      <span>{tipo === "sucesso" ? "✅" : "❌"}</span>
      <span style={{ flex:1 }}>{mensagem}</span>
      <button onClick={aoFechar} style={{ background:"none", border:"none", color: e.color, cursor:"pointer", opacity:0.6, fontSize:13 }}>✕</button>
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

const RelatosAdmin = () => {
  const [listaRelatos, setListaRelatos]     = useState([]);
  const [carregando, setCarregando]         = useState(true);
  const [modalAberto, setModalAberto]       = useState(false);
  const [relatoEditando, setRelatoEditando] = useState(null);
  const [formulario, setFormulario]         = useState(estadoInicial);
  const [mensagemErro, setMensagemErro]     = useState("");
  const [salvando, setSalvando]             = useState(false);
  const [toast, setToast]                   = useState({ visivel: false, mensagem: "", tipo: "sucesso" });
  const [confirmar, setConfirmar]           = useState({ visivel: false, id: null });

  const mostrarToast = (mensagem, tipo = "sucesso") => setToast({ visivel: true, mensagem, tipo });
  const fecharToast  = () => setToast((t) => ({ ...t, visivel: false }));

  useEffect(() => { carregarRelatos(); }, []);

  const carregarRelatos = async () => {
    try {
      setCarregando(true);
      const resposta = await fetch(`${URL_API}/relatos`);
      const dados = await resposta.json();
      setListaRelatos(Array.isArray(dados) ? dados : []);
    } catch { mostrarToast("Erro ao carregar relatos.", "erro"); }
    finally { setCarregando(false); }
  };

  const abrirModalNovo = () => {
    setRelatoEditando(null);
    setFormulario(estadoInicial);
    setMensagemErro("");
    setModalAberto(true);
  };

  const abrirModalEditar = (relato) => {
    setRelatoEditando(relato);
    setFormulario({ nome: relato.nome || "", animal: relato.animal || "", relato: relato.relato || "", imagem: relato.imagem || "" });
    setMensagemErro("");
    setModalAberto(true);
  };

  const handleCampo = (e) => {
    const { name, value } = e.target;
    setFormulario((ant) => ({ ...ant, [name]: value }));
  };

  const handleSalvar = async () => {
    if (!formulario.nome || !formulario.animal || !formulario.relato) {
      setMensagemErro("Nome, animal e relato são obrigatórios.");
      return;
    }
    try {
      setSalvando(true);
      if (relatoEditando) {
        await fetch(`${URL_API}/relatos/${relatoEditando._id}`, { method: "PUT", headers: montarCabecalhos(), body: JSON.stringify(formulario) });
        mostrarToast("Relato atualizado com sucesso!");
      } else {
        await fetch(`${URL_API}/relatos`, { method: "POST", headers: montarCabecalhos(), body: JSON.stringify(formulario) });
        mostrarToast("Relato criado com sucesso!");
      }
      await carregarRelatos();
      setModalAberto(false);
    } catch { setMensagemErro("Erro ao salvar relato."); }
    finally { setSalvando(false); }
  };

  const pedirConfirmacaoDeletar = (id) => setConfirmar({ visivel: true, id });

  const confirmarDeletar = async () => {
    try {
      await fetch(`${URL_API}/relatos/${confirmar.id}`, { method: "DELETE", headers: montarCabecalhos() });
      await carregarRelatos();
      mostrarToast("Relato removido com sucesso!");
    } catch { mostrarToast("Erro ao deletar relato.", "erro"); }
    finally { setConfirmar({ visivel: false, id: null }); }
  };

  const formatarData = (d) => d ? new Date(d).toLocaleDateString("pt-BR") : "—";

  return (
    <div className="pagina-tabela-simples">
      <Toast visivel={toast.visivel} mensagem={toast.mensagem} tipo={toast.tipo} aoFechar={fecharToast} />
      <ModalConfirmar
        visivel={confirmar.visivel}
        mensagem="Deseja remover este relato? Esta ação não pode ser desfeita."
        aoConfirmar={confirmarDeletar}
        aoCancelar={() => setConfirmar({ visivel: false, id: null })}
      />

      <div className="pagina-tabela-simples__topo">
        <h2 className="pagina-tabela-simples__titulo">Relatos de Adoção</h2>
        <button className="pagina-tabela-simples__botao-novo" onClick={abrirModalNovo}>＋ Novo Relato</button>
      </div>

      <div className="pagina-tabela-simples__wrapper">
        {carregando ? (
          <p className="pagina-tabela-simples__vazio">Carregando...</p>
        ) : (
          <table className="pagina-tabela-simples__tabela">
            <thead>
              <tr><th>Nome</th><th>Animal</th><th>Relato</th><th>Data</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {listaRelatos.length === 0 ? (
                <tr><td colSpan={5}><p className="pagina-tabela-simples__vazio">Nenhum relato cadastrado.</p></td></tr>
              ) : (
                listaRelatos.map((relato) => (
                  <tr key={relato._id}>
                    <td>{relato.nome}</td>
                    <td>{relato.animal}</td>
                    <td style={{ maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{relato.relato}</td>
                    <td>{formatarData(relato.createdAt)}</td>
                    <td>
                      <div className="pagina-tabela-simples__acoes">
                        <button className="pagina-tabela-simples__botao-editar" onClick={() => abrirModalEditar(relato)}>✏️ Editar</button>
                        <button className="pagina-tabela-simples__botao-deletar" onClick={() => pedirConfirmacaoDeletar(relato._id)}>🗑️ Deletar</button>
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
        <div className="pagina-relatos__modal-fundo" onClick={() => setModalAberto(false)}>
          <div className="pagina-relatos__modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="pagina-relatos__modal-titulo">{relatoEditando ? "✏️ Editar Relato" : "➕ Novo Relato"}</h3>
            {mensagemErro && <p className="pagina-relatos__erro">{mensagemErro}</p>}
            <div className="pagina-relatos__formulario">
              <div className="pagina-relatos__grupo-linha">
                <div className="pagina-relatos__grupo">
                  <label className="pagina-relatos__label">Nome do adotante *</label>
                  <input className="pagina-relatos__input" name="nome" value={formulario.nome} onChange={handleCampo} placeholder="Ex: Maria Clara" />
                </div>
                <div className="pagina-relatos__grupo">
                  <label className="pagina-relatos__label">Nome do animal *</label>
                  <input className="pagina-relatos__input" name="animal" value={formulario.animal} onChange={handleCampo} placeholder="Ex: Thor" />
                </div>
              </div>
              <div className="pagina-relatos__grupo">
                <label className="pagina-relatos__label">Relato *</label>
                <textarea className="pagina-relatos__textarea" name="relato" value={formulario.relato} onChange={handleCampo} placeholder="Escreva o depoimento..." />
              </div>
              <div className="pagina-relatos__grupo">
                <label className="pagina-relatos__label">URL da foto</label>
                <input className="pagina-relatos__input" name="imagem" value={formulario.imagem} onChange={handleCampo} placeholder="https://i.imgur.com/..." />
              </div>
            </div>
            <div className="pagina-relatos__modal-rodape">
              <button className="pagina-relatos__botao-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
              <button className="pagina-relatos__botao-salvar" onClick={handleSalvar} disabled={salvando}>
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
