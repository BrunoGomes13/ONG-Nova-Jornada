import { useState, useEffect } from "react";
import "../Usuarios/Usuarios.css";

/* ── Contatos mockados (integrar com backend quando disponível) ── */
const contatosMockados = [
  { _id: "1", nome: "Carlos Lima",    email: "carlos@email.com", mensagem: "Quero adotar um cachorro.",    data: "2024-03-12", lido: false },
  { _id: "2", nome: "Paula Rocha",    email: "paula@email.com",  mensagem: "Como funciona o processo?",    data: "2024-03-08", lido: true  },
  { _id: "3", nome: "Lucas Ferreira", email: "lucas@email.com",  mensagem: "Quero ser voluntário.",        data: "2024-02-20", lido: true  },
];

const Contatos = () => {
  const [listaContatos, setListaContatos] = useState([]);
  const [carregando, setCarregando]       = useState(true);

  useEffect(() => {
    /* ── Simulação de chamada à API (substituir por fetch real) ── */
    setTimeout(() => {
      setListaContatos(contatosMockados);
      setCarregando(false);
    }, 600);
  }, []);

  const handleDeletar = (id) => {
    if (!window.confirm("Deseja remover este contato?")) return;
    setListaContatos((ant) => ant.filter((c) => c._id !== id));
  };

  const formatarData = (dataISO) => new Date(dataISO).toLocaleDateString("pt-BR");

  return (
    <div className="pagina-tabela-simples">
      <div className="pagina-tabela-simples__topo">
        <h2 className="pagina-tabela-simples__titulo">Mensagens de Contato</h2>
      </div>

      <div className="pagina-tabela-simples__wrapper">
        {carregando ? (
          <p className="pagina-tabela-simples__vazio">Carregando...</p>
        ) : (
          <table className="pagina-tabela-simples__tabela">
            <thead>
              <tr><th>Nome</th><th>Email</th><th>Mensagem</th><th>Data</th><th>Status</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {listaContatos.length === 0 ? (
                <tr><td colSpan={6}><p className="pagina-tabela-simples__vazio">Nenhuma mensagem encontrada.</p></td></tr>
              ) : (
                listaContatos.map((contato) => (
                  <tr key={contato._id}>
                    <td>{contato.nome}</td>
                    <td>{contato.email}</td>
                    <td>{contato.mensagem}</td>
                    <td>{formatarData(contato.data)}</td>
                    <td>
                      <span className={`pagina-tabela-simples__tag pagina-tabela-simples__tag--${contato.lido ? "lido" : "novo"}`}>
                        {contato.lido ? "Lido" : "● Novo"}
                      </span>
                    </td>
                    <td>
                      <button className="pagina-tabela-simples__botao-deletar" onClick={() => handleDeletar(contato._id)}>
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
