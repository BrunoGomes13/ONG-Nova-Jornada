import { useState, useEffect } from "react";
import { getUsuarios, deletarUsuario } from "../../../services/adminApi";
import "./Usuarios.css";

const Usuarios = () => {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [carregando, setCarregando]       = useState(true);

  useEffect(() => { carregarUsuarios(); }, []);

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      const dados = await getUsuarios();
      setListaUsuarios(dados || []);
    } catch { console.error("Erro ao buscar usuários"); }
    finally { setCarregando(false); }
  };

  const handleDeletar = async (id) => {
    if (!window.confirm("Deseja remover este usuário?")) return;
    try { await deletarUsuario(id); await carregarUsuarios(); }
    catch { alert("Erro ao deletar usuário."); }
  };

  /* ── Formata data para pt-BR ── */
  const formatarData = (dataISO) => {
    if (!dataISO) return "—";
    return new Date(dataISO).toLocaleDateString("pt-BR");
  };

  return (
    <div className="pagina-tabela-simples">
      <div className="pagina-tabela-simples__topo">
        <h2 className="pagina-tabela-simples__titulo">Usuários Cadastrados</h2>
      </div>

      <div className="pagina-tabela-simples__wrapper">
        {carregando ? (
          <p className="pagina-tabela-simples__vazio">Carregando...</p>
        ) : (
          <table className="pagina-tabela-simples__tabela">
            <thead>
              <tr><th>Nome</th><th>Email</th><th>Perfil</th><th>Cadastrado em</th><th>Ações</th></tr>
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
                      <button className="pagina-tabela-simples__botao-deletar" onClick={() => handleDeletar(usuario._id)}>
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
