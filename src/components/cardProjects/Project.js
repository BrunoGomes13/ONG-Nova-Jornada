import { useEffect, useState } from "react";
import './Project.css'

/* ── URL base da API ── */
const URL_API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* ── Componente de card de projeto ── */
function CardProject() {
  const [projetos, setProjetos]     = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro]             = useState("");

  /* ── Busca projetos da API ao montar ── */
  useEffect(() => {
    const buscarProjetos = async () => {
      try {
        setCarregando(true);
        const resposta = await fetch(`${URL_API}/projetos`);
        const dados    = await resposta.json();

        if (Array.isArray(dados)) {
          /* ── Só exibe projetos ativos ── */
          setProjetos(dados.filter((p) => p.ativo !== false));
        } else {
          setProjetos([]);
        }
      } catch (erro) {
        console.error("Erro ao buscar projetos:", erro);
        setErro("Não foi possível carregar os projetos.");
      } finally {
        setCarregando(false);
      }
    };

    buscarProjetos();
  }, []);

  /* ── Carregando ── */
  if (carregando) {
    return (
      <section id="card-project">
        <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", width: "100%" }}>
          Carregando projetos...
        </p>
      </section>
    );
  }

  /* ── Erro ── */
  if (erro) {
    return (
      <section id="card-project">
        <p style={{ color: "#f87171", textAlign: "center", width: "100%" }}>{erro}</p>
      </section>
    );
  }

  /* ── Sem projetos ── */
  if (projetos.length === 0) {
    return (
      <section id="card-project">
        <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", width: "100%" }}>
          Nenhum projeto cadastrado ainda.
        </p>
      </section>
    );
  }

  return (
    <section id="card-project">
      {projetos.map((projeto) => (
        <div key={projeto._id} className="card">
          {/* ── Imagem do projeto ── */}
          {projeto.imagem && (
            <img
              src={projeto.imagem}
              alt={"Foto do projeto " + projeto.titulo}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}

          <div className="card-conteudo">
            {/* ── Objetivo como destaque (substitui o "+ 1.200 resgates") ── */}
            {projeto.objetivo && <span>{projeto.objetivo}</span>}

            <h3>{projeto.titulo}</h3>
            <p>{projeto.descricao}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default CardProject;
