import { useState, useEffect } from "react";
import { getUsuarios, deletarUsuario } from "../../../services/adminApi";
import "./Usuarios.css";

/* ── Toast ── */
const Toast = ({ mensagem, tipo, visivel, aoFechar }) => {
  useEffect(() => {
    if (!visivel) return;
    const t = setTimeout(aoFechar, 3000);
    return () => clearTimeout(t);
  }, [visivel, aoFechar]);

  if (!visivel) return null;

  const estiloSucesso = {
    container: { position:"fixed", top:24, right:24, zIndex:9999, display:"flex", alignItems:"center", gap:10, padding:"14px 18px", borderRadius:12, minWidth:260, background:"#13161f", border:"1px solid rgba(74,222,128,0.3)", color:"#4ade80", fontFamily:"Sora,sans-serif", fontSize:13, fontWeight:500, boxShadow:"0 8px 32px rgba(0,0,0,0.35)" },
    botao: { background:"none", border:"none", color:"#4ade80", cursor:"pointer", opacity:0.6, fontSize:13 },
  };
  const estiloErro = {
    container: { position:"fixed", top:24, right:24, zIndex:9999, display:"flex", alignItems:"center", gap:10, padding:"14px 18px", borderRadius:12, minWidth:260, background:"#13161f", border:"1px solid rgba(248,113,113,0.3)", color:"#f87171", fontFamily:"Sora,sans-serif", fontSize:13, fontWeight:500, boxShadow:"0 8px 32px rgba(0,0,0,0.35)" },
    botao: { background:"none", border:"none", color:"#f87171", cursor:"pointer", opacity:0.6, fontSize:13 },
  };

  const estilo = tipo === "sucesso" ? estiloSucesso : estiloErro;
  const icone  = tipo === "sucesso" ? "✅" : "❌";

  return (
    <div style={estilo.container}>
      <span>{icone}</span>
      <span style={{ flex:1 }}>{mensagem}</span>
      <button onClick={aoFechar} style={estilo.botao}>✕</button>
    </div>
  );
};

/* ── Modal de confirmação de exclusão, sem window.confirm ── */
const ModalConfirmar = ({ visivel, mensagem, aoConfirmar, aoCancelar }) => {
  if (!visivel) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:10000, backdropFilter:"blur(4px)" }}>
      <div style={{ background:"#1a1d27", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:28, width:"100%", maxWidth:360, fontFamily:"Sora,sans-serif" }}>
        <p style={{ color:"#ffffff", fontSize:15, fontWeight:600, marginBottom:8 }}>Confirmar exclusão</p>
        <p style={{ color:"rgba(255,255,255,0.5)", fontSize:13, marginBottom:24 }}>{mensagem}</p>
        <div style={{ display:"flex", gap:12, justifyContent:"flex-end" }}>
          <button onClick={aoCancelar} style={{ padding:"9px 18px", background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.6)", border:"none", borderRadius:10, fontFamily:"Sora,sans-serif", fontSize:13, fontWeight:600, cursor:"pointer" }}>
            Cancelar
          </button>
          <button onClick={aoConfirmar} style={{ padding:"9px 18px", background:"rgba(248,113,113,0.15)", color:"#f87171", border:"1px solid rgba(248,113,113,0.3)", borderRadius:10, fontFamily:"Sora,sans-serif", fontSize:13, fontWeight:600, cursor:"pointer" }}>
            🗑️ Remover
          </button>
        </div>
      </div>
    </div>
  );
};

const Usuarios = () => {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [carregando, setCarregando]       = useState(true);
  const [toast, setToast]         = useState({ visivel: false, mensagem: "", tipo: "sucesso" });
  const [confirmar, setConfirmar] = useState({ visivel: false, id: null });

  const mostrarToast = (mensagem, tipo = "sucesso") => setToast({ visivel: true, mensagem, tipo });
  const fecharToast  = () => setToast((t) => ({ ...t, visivel: false }));

  /* ── Busca usuários ao montar e a cada 10s ── */
  useEffect(() => {
    carregarUsuarios();
    const intervalo = setInterval(carregarUsuarios, 10000);
    return () => clearInterval(intervalo);
  }, []);

  const carregarUsuarios = async () => {
    try {
      const dados = await getUsuarios();
      setListaUsuarios(Array.isArray(dados) ? dados : []);
    } catch { console.error("Erro ao buscar usuários"); }
    finally { setCarregando(false); }
  };

  /* ── Abre modal de confirmação em vez de window.confirm ── */
  const pedirConfirmacaoDeletar = (id) => setConfirmar({ visivel: true, id });

  const confirmarDeletar = async () => {
    try {
      await deletarUsuario(confirmar.id);
      await carregarUsuarios();
      mostrarToast("Usuário removido com sucesso!");
    } catch {
      mostrarToast("Erro ao deletar usuário.", "erro");
    } finally {
      setConfirmar({ visivel: false, id: null });
    }
  };

  const formatarData = (dataISO) =>
    dataISO ? new Date(dataISO).toLocaleDateString("pt-BR") : "—";

  return (
    <div className="pagina-tabela-simples">
      <Toast visivel={toast.visivel} mensagem={toast.mensagem} tipo={toast.tipo} aoFechar={fecharToast} />
      <ModalConfirmar
        visivel={confirmar.visivel}
        mensagem="Tem certeza que deseja remover este usuário? Esta ação não pode ser desfeita."
        aoConfirmar={confirmarDeletar}
        aoCancelar={() => setConfirmar({ visivel: false, id: null })}
      />

      <div className="pagina-tabela-simples__topo">
        <h2 className="pagina-tabela-simples__titulo">Usuários Cadastrados</h2>
        <span style={{ fontFamily:"Sora,sans-serif", fontSize:13, color:"rgba(255,255,255,0.4)" }}>
          {listaUsuarios.length} usuário{listaUsuarios.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="pagina-tabela-simples__wrapper">
        {carregando ? (
          <p className="pagina-tabela-simples__vazio">Carregando...</p>
        ) : (
          <table className="pagina-tabela-simples__tabela">
            <thead>
              <tr>
                <th>Nome</th><th>Email</th><th>Perfil</th><th>Cadastrado em</th><th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaUsuarios.length === 0 ? (
                <tr><td colSpan={5}><p className="pagina-tabela-simples__vazio">Nenhum usuário encontrado.</p></td></tr>
              ) : (
                listaUsuarios.map((usuario) => (
                  <tr key={usuario._id}>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <span className={`pagina-tabela-simples__tag pagina-tabela-simples__tag--${usuario.role}`}>
                        {usuario.role === "admin" ? "👑 Admin" : "👤 Cliente"}
                      </span>
                    </td>
                    <td>{formatarData(usuario.createdAt)}</td>
                    <td>
                      <button
                        className="pagina-tabela-simples__botao-deletar"
                        onClick={() => pedirConfirmacaoDeletar(usuario._id)}
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

export default Usuarios;
