import "./Relatos.css";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardRelato from "../../components/cardRelatos/CardRelato";

/* ── URL base da API ── */
const URL_API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* ── Página de Relatos de Adoção ── */
function Relatos() {
  const [relatos, setRelatos]       = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro]             = useState("");

  /* ── Busca relatos da API ao montar ── */
  useEffect(() => {
    const buscarRelatos = async () => {
      try {
        setCarregando(true);
        const resposta = await fetch(`${URL_API}/relatos`);
        const dados    = await resposta.json();

        if (Array.isArray(dados)) {
          setRelatos(dados);
        } else {
          setRelatos([]);
        }
      } catch (erro) {
        console.error("Erro ao buscar relatos:", erro);
        setErro("Não foi possível carregar os relatos.");
      } finally {
        setCarregando(false);
      }
    };

    buscarRelatos();
  }, []);

  return (
    <>
      <Header />

      <div className="relatos-container">
        <section className="relatos-header">
          <h1>Relatos de Adoção</h1>
          <p>
            Conheça histórias emocionantes de pessoas que encontraram
            um novo melhor amigo através da adoção.
          </p>
        </section>

        <section className="relatos-cards">
          {/* ── Carregando ── */}
          {carregando && (
            <p style={{ textAlign: "center", opacity: 0.5 }}>Carregando relatos...</p>
          )}

          {/* ── Erro ── */}
          {erro && (
            <p style={{ textAlign: "center", color: "#f87171" }}>{erro}</p>
          )}

          {/* ── Sem relatos ── */}
          {!carregando && !erro && relatos.length === 0 && (
            <p style={{ textAlign: "center", opacity: 0.5 }}>
              Nenhum relato cadastrado ainda.
            </p>
          )}

          {/* ── Lista de relatos vindos da API ── */}
          {relatos.map((relato) => (
            <CardRelato
              key={relato._id}
              nome={relato.nome}
              animal={relato.animal}
              relato={relato.relato}
              imagem={relato.imagem}
            />
          ))}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Relatos;