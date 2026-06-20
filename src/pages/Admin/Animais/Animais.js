import { useState, useEffect } from "react";
import { getAnimais, criarAnimal, atualizarAnimal, deletarAnimal } from "../../../services/adminApi";
import "./Animais.css";

const estadoInicialFormulario = {
  nome: "", especie: "", raca: "", idade: "",
  sexo: "", porte: "", descricao: "", status: "disponivel", imagem: "",
};

/* ── Toast ── */
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

/* ── Modal de confirmação de exclusão ── */
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

const Animais = () => {
  const [listaAnimais, setListaAnimais]       = useState([]);
  const [carregando, setCarregando]           = useState(true);
  const [modalAberto, setModalAberto]         = useState(false);
  const [animalEditando, setAnimalEditando]   = useState(null);
  const [dadosFormulario, setDadosFormulario] = useState(estadoInicialFormulario);
  const [mensagemErro, setMensagemErro]       = useState("");
  const [salvando, setSalvando]               = useState(false);
  const [toast, setToast]                     = useState({ visivel: false, mensagem: "", tipo: "sucesso" });
  const [confirmar, setConfirmar]             = useState({ visivel: false, id: null });

  const mostrarToast = (mensagem, tipo = "sucesso") => setToast({ visivel: true, mensagem, tipo });
  const fecharToast  = () => setToast((t) => ({ ...t, visivel: false }));

  useEffect(() => { carregarAnimais(); }, []);

  const carregarAnimais = async () => {
    try {
      setCarregando(true);
      const dados = await getAnimais();
      setListaAnimais(dados || []);
    } catch { mostrarToast("Erro ao carregar animais.", "erro"); }
    finally { setCarregando(false); }
  };

  const abrirModalNovo = () => {
    setAnimalEditando(null);
    setDadosFormulario(estadoInicialFormulario);
    setMensagemErro("");
    setModalAberto(true);
  };

  const abrirModalEditar = (animal) => {
    setAnimalEditando(animal);
    setDadosFormulario({
      nome: animal.nome || "", especie: animal.especie || "",
      raca: animal.raca || "", idade: animal.idade || "",
      sexo: animal.sexo || "", porte: animal.porte || "",
      descricao: animal.descricao || "", status: animal.status || "disponivel",
      imagem: animal.imagem || "",
    });
    setMensagemErro("");
    setModalAberto(true);
  };

  const handleCampoAlterado = (e) => {
    const { name, value } = e.target;
    setDadosFormulario((ant) => ({ ...ant, [name]: value }));
  };

  const handleSalvar = async () => {
    if (!dadosFormulario.nome || !dadosFormulario.especie) {
      setMensagemErro("Nome e espécie são obrigatórios.");
      return;
    }
    try {
      setSalvando(true);
      if (animalEditando) {
        await atualizarAnimal(animalEditando._id, dadosFormulario);
        mostrarToast("Animal atualizado com sucesso!");
      } else {
        await criarAnimal(dadosFormulario);
        mostrarToast("Animal cadastrado com sucesso!");
      }
      await carregarAnimais();
      setModalAberto(false);
    } catch (erro) {
      setMensagemErro(erro.message || "Erro ao salvar animal.");
    } finally { setSalvando(false); }
  };

  const pedirConfirmacaoDeletar = (id) => setConfirmar({ visivel: true, id });

  const confirmarDeletar = async () => {
    try {
      await deletarAnimal(confirmar.id);
      await carregarAnimais();
      mostrarToast("Animal removido com sucesso!");
    } catch { mostrarToast("Erro ao deletar animal.", "erro"); }
    finally { setConfirmar({ visivel: false, id: null }); }
  };

  return (
    <div className="pagina-animais">
      <Toast visivel={toast.visivel} mensagem={toast.mensagem} tipo={toast.tipo} aoFechar={fecharToast} />
      <ModalConfirmar
        visivel={confirmar.visivel}
        mensagem="Tem certeza que deseja remover este animal? Esta ação não pode ser desfeita."
        aoConfirmar={confirmarDeletar}
        aoCancelar={() => setConfirmar({ visivel: false, id: null })}
      />

      <div className="pagina-animais__topo">
        <h2 className="pagina-animais__titulo">Animais Cadastrados</h2>
        <button className="pagina-animais__botao-novo" onClick={abrirModalNovo}>＋ Novo Animal</button>
      </div>

      <div className="pagina-animais__tabela-wrapper">
        {carregando ? (
          <p className="pagina-animais__vazio">Carregando...</p>
        ) : (
          <table className="pagina-animais__tabela">
            <thead>
              <tr><th>Nome</th><th>Espécie</th><th>Raça</th><th>Porte</th><th>Sexo</th><th>Status</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {listaAnimais.length === 0 ? (
                <tr><td colSpan={7}><p className="pagina-animais__vazio">Nenhum animal cadastrado.</p></td></tr>
              ) : (
                listaAnimais.map((animal) => (
                  <tr key={animal._id}>
                    <td>{animal.nome}</td>
                    <td>{animal.especie}</td>
                    <td>{animal.raca || "—"}</td>
                    <td>{animal.porte || "—"}</td>
                    <td>{animal.sexo || "—"}</td>
                    <td>
                      <span className={`pagina-animais__tag pagina-animais__tag--${animal.status}`}>
                        {animal.status === "disponivel" ? "Disponível" : "Adotado"}
                      </span>
                    </td>
                    <td>
                      <div className="pagina-animais__acoes">
                        <button className="pagina-animais__botao-editar" onClick={() => abrirModalEditar(animal)}>✏️ Editar</button>
                        <button className="pagina-animais__botao-deletar" onClick={() => pedirConfirmacaoDeletar(animal._id)}>🗑️ Deletar</button>
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
        <div className="pagina-animais__modal-fundo" onClick={() => setModalAberto(false)}>
          <div className="pagina-animais__modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="pagina-animais__modal-titulo">{animalEditando ? "✏️ Editar Animal" : "➕ Novo Animal"}</h3>
            {mensagemErro && <p className="pagina-animais__erro">{mensagemErro}</p>}
            <div className="pagina-animais__formulario">
              <div className="pagina-animais__grupo-linha">
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Nome *</label>
                  <input className="pagina-animais__input" name="nome" value={dadosFormulario.nome} onChange={handleCampoAlterado} placeholder="Ex: Rex" />
                </div>
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Espécie *</label>
                  <select className="pagina-animais__select" name="especie" value={dadosFormulario.especie} onChange={handleCampoAlterado}>
                    <option value="">Selecione</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>
              <div className="pagina-animais__grupo-linha">
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Raça</label>
                  <input className="pagina-animais__input" name="raca" value={dadosFormulario.raca} onChange={handleCampoAlterado} placeholder="Ex: SRD" />
                </div>
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Idade (anos)</label>
                  <input className="pagina-animais__input" type="number" name="idade" value={dadosFormulario.idade} onChange={handleCampoAlterado} placeholder="Ex: 2" />
                </div>
              </div>
              <div className="pagina-animais__grupo-linha">
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Sexo</label>
                  <select className="pagina-animais__select" name="sexo" value={dadosFormulario.sexo} onChange={handleCampoAlterado}>
                    <option value="">Selecione</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </select>
                </div>
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Porte</label>
                  <select className="pagina-animais__select" name="porte" value={dadosFormulario.porte} onChange={handleCampoAlterado}>
                    <option value="">Selecione</option>
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>
              </div>
              <div className="pagina-animais__grupo-linha">
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Status</label>
                  <select className="pagina-animais__select" name="status" value={dadosFormulario.status} onChange={handleCampoAlterado}>
                    <option value="disponivel">Disponível</option>
                    <option value="adotado">Adotado</option>
                  </select>
                </div>
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">URL da Imagem</label>
                  <input className="pagina-animais__input" name="imagem" value={dadosFormulario.imagem} onChange={handleCampoAlterado} placeholder="https://..." />
                </div>
              </div>
              <div className="pagina-animais__grupo">
                <label className="pagina-animais__label">Descrição</label>
                <textarea className="pagina-animais__textarea" name="descricao" value={dadosFormulario.descricao} onChange={handleCampoAlterado} placeholder="Descreva o animal..." />
              </div>
            </div>
            <div className="pagina-animais__modal-rodape">
              <button className="pagina-animais__botao-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
              <button className="pagina-animais__botao-salvar" onClick={handleSalvar} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar Animal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Animais;
