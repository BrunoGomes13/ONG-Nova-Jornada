import { useState, useEffect } from "react";
import "../Usuarios/Usuarios.css";

const URL_API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const pegarToken = () => localStorage.getItem("token");
const montarCabecalhos = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${pegarToken()}`,
});

/* ── Toast ── */
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

/* ── Modal de confirmação de exclusão ── */
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

/* ── Modal de visualização da mensagem completa ── */
const ModalVisualizar = ({ contato, aoFechar }) => {
  if (!contato) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:10000, backdropFilter:"blur(4px)" }} onClick={aoFechar}>
      <div style={{ background:"#1a1d27", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:28, width:"100%", maxWidth:480, fontFamily:"Sora,sans-serif" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
          <div>
            <p style={{ color:"#ffffff", fontSize:15, fontWeight:700, marginBottom:4 }}>{contato.nome}</p>
            <p style={{ color:"rgba(255,255,255,0.45)", fontSize:12 }}>{contato.email}</p>
          </div>
          {contato.tipo === "adocao" && (
            <span style={{ background:"rgba(255,107,53,0.12)", color:"#ff6b35", fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20 }}>
              🐾 {contato.animalNome}
            </span>
          )}
        </div>
        <p style={{ color:"rgba(255,255,255,0.8)", fontSize:13, lineHeight:1.6, background:"rgba(255,255,255,0.04)", padding:14, borderRadius:10, marginBottom:20 }}>
          {contato.mensagem}
        </p>
        <div style={{ display:"flex", justifyContent:"flex-end" }}>
          <button onClick={aoFechar} style={{ padding:"9px 20px", background:"#ff6b35", color:"#fff", border:"none", borderRadius:10, fontFamily:"Sora,sans-serif", fontSize:13, fontWeight:600, cursor:"pointer" }}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

const Contatos = () => {
  const [listaContatos, setListaContatos] = useState([]);
  const [carregando, setCarregando]       = useState(true);
  const [toast, setToast] = useState({ visivel: false, mensagem: "", tipo: "sucesso" });
  const [confirmar, setConfirmar] = useState({ visivel: false, id: null });
  const [visualizando, setVisualizando] = useState(null);

  const mostrarToast = (mensagem, tipo = "sucesso") => setToast({ visivel: true, mensagem, tipo });
  const fecharToast  = () => setToast((t) => ({ ...t, visivel: false }));

  /* ── Busca contatos ao montar e a cada 10s ── */
  useEffect(() => {
    carregarContatos();
    const intervalo = setInterval(carregarContatos, 10000);
    return () => clearInterval(intervalo);
  }, []);

  const carregarContatos = async () => {
    try {
      const resposta = await fetch(`${URL_API}/contatos`, { headers: montarCabecalhos() });
      const dados = await resposta.json();
      setListaContatos(Array.isArray(dados) ? dados : []);
    } catch { console.error("Erro ao buscar contatos"); }
    finally { setCarregando(false); }
  };

  /* ── Abre o modal e marca como lido ── */
  const abrirMensagem = async (contato) => {
    setVisualizando(contato);
    if (!contato.lido) {
      try {
        await fetch(`${URL_API}/contatos/${contato._id}/lido`, { method: "PUT", headers: montarCabecalhos() });
        setListaContatos((ant) => ant.map((c) => c._id === contato._id ? { ...c, lido: true } : c));
      } catch { /* silencioso */ }
    }
  };

  const pedirConfirmacaoDeletar = (id) => setConfirmar({ visivel: true, id });

  const confirmarDeletar = async () => {
    try {
      await fetch(`${URL_API}/contatos/${confirmar.id}`, { method: "DELETE", headers: montarCabecalhos() });
      await carregarContatos();
      mostrarToast("Mensagem removida com sucesso!");
    } catch { mostrarToast("Erro ao deletar mensagem.", "erro"); }
    finally { setConfirmar({ visivel: false, id: null }); }
  };

  const formatarData = (d) => d ? new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";

  const naoLidas = listaContatos.filter((c) => !c.lido).length;

  return (
    <div className="pagina-tabela-simples">
      <Toast visivel={toast.visivel} mensagem={toast.mensagem} tipo={toast.tipo} aoFechar={fecharToast} />
      <ModalConfirmar
        visivel={confirmar.visivel}
        mensagem="Deseja remover esta mensagem? Esta ação não pode ser desfeita."
        aoConfirmar={confirmarDeletar}
        aoCancelar={() => setConfirmar({ visivel: false, id: null })}
      />
      <ModalVisualizar contato={visualizando} aoFechar={() => setVisualizando(null)} />

      <div className="pagina-tabela-simples__topo">
        <h2 className="pagina-tabela-simples__titulo">Mensagens de Contato</h2>
        <span style={{ fontFamily:"Sora,sans-serif", fontSize:13, color:"rgba(255,255,255,0.4)" }}>
          {naoLidas > 0 ? `${naoLidas} não lida${naoLidas !== 1 ? "s" : ""}` : "Tudo lido"}
        </span>
      </div>

      <div className="pagina-tabela-simples__wrapper">
        {carregando ? (
          <p className="pagina-tabela-simples__vazio">Carregando...</p>
        ) : (
          <table className="pagina-tabela-simples__tabela">
            <thead>
              <tr><th>Nome</th><th>Email</th><th>Origem</th><th>Mensagem</th><th>Data</th><th>Status</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {listaContatos.length === 0 ? (
                <tr><td colSpan={7}><p className="pagina-tabela-simples__vazio">Nenhuma mensagem recebida ainda.</p></td></tr>
              ) : (
                listaContatos.map((contato) => (
                  <tr
                    key={contato._id}
                    style={{ cursor: "pointer", fontWeight: contato.lido ? 400 : 700 }}
                    onClick={() => abrirMensagem(contato)}
                  >
                    <td>{contato.nome}</td>
                    <td>{contato.email}</td>
                    <td>
                      {contato.tipo === "adocao" ? (
                        <span className="pagina-tabela-simples__tag" style={{ color: "#ff6b35", background: "rgba(255,107,53,0.12)" }}>
                          🐾 {contato.animalNome || "Adoção"}
                        </span>
                      ) : (
                        <span className="pagina-tabela-simples__tag pagina-tabela-simples__tag--cliente">
                          ✉️ Geral
                        </span>
                      )}
                    </td>
                    <td style={{ maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {contato.mensagem}
                    </td>
                    <td>{formatarData(contato.createdAt)}</td>
                    <td>
                      <span className={`pagina-tabela-simples__tag pagina-tabela-simples__tag--${contato.lido ? "lido" : "novo"}`}>
                        {contato.lido ? "Lido" : "● Novo"}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button
                        className="pagina-tabela-simples__botao-deletar"
                        onClick={() => pedirConfirmacaoDeletar(contato._id)}
                      >
                        🗑️ Deletar
                      </button>
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

export default Contatos;
