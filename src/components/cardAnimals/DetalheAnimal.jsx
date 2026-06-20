import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./DetalheAnimal.css";

const URL_API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* ── Resolve imagem vinda da API (URL) ou local (require) ── */
function resolverImagem(imagem) {
  if (!imagem) return "https://placehold.co/600x400?text=Sem+foto";
  if (imagem.startsWith("http")) return imagem;
  try {
    return require("../../assets/animals/" + imagem);
  } catch {
    return "https://placehold.co/600x400?text=Sem+foto";
  }
}

/* ── Verifica se há um usuário logado ── */
function usuarioEstaLogado() {
  return !!localStorage.getItem("token") && !!localStorage.getItem("usuario");
}

function DetalheAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ── Estado do animal vindo da API ── */
  const [animal, setAnimal]         = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  const [interesse, setInteresse] = useState(false);
  const [nome, setNome]           = useState("");
  const [mensagem, setMensagem]   = useState("");
  const [erro, setErro]           = useState("");
  const [enviando, setEnviando]   = useState(false);
  const [enviado, setEnviado]     = useState(false);

  /* ── Busca o animal pelo ID na API ── */
  useEffect(() => {
    const buscarAnimal = async () => {
      try {
        setCarregando(true);
        const resposta = await fetch(`${URL_API}/animais/${id}`);

        if (!resposta.ok) {
          setNaoEncontrado(true);
          return;
        }

        const dados = await resposta.json();
        setAnimal(dados);

        /* ── Verifica se já está nos favoritos ── */
        const salvos = JSON.parse(localStorage.getItem("favoritos") || "[]");
        setInteresse(salvos.includes(dados._id));
      } catch (erro) {
        console.error("Erro ao buscar animal:", erro);
        setNaoEncontrado(true);
      } finally {
        setCarregando(false);
      }
    };

    buscarAnimal();
    window.scrollTo(0, 0);
  }, [id]);

  /* ── Favoritar/desfavoritar ── */
  function toggleFavorito() {
    if (!animal) return;
    const salvos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    const novo = interesse
      ? salvos.filter((favId) => favId !== animal._id)
      : [...salvos, animal._id];
    localStorage.setItem("favoritos", JSON.stringify(novo));
    setInteresse(!interesse);
  }

  /* ── Botão "Tenho interesse" / "Adotar": exige login ── */
  function handleClickAdotar() {
    if (!usuarioEstaLogado()) {
      /* ── Redireciona para login, guardando a página de volta ── */
      navigate("/login", { state: { de: `/animais/${id}` } });
      return;
    }
    /* ── Usuário logado: marca interesse normalmente ── */
    toggleFavorito();
  }

  /* ── Envio do formulário de interesse: salva no backend (aparece no admin) ── */
  async function handleEnviar() {
    if (!usuarioEstaLogado()) {
      navigate("/login", { state: { de: `/animais/${id}` } });
      return;
    }
    if (!nome.trim()) {
      setErro("Por favor, informe seu nome.");
      return;
    }
    setErro("");

    /* ── Pega o email do usuário logado ── */
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "{}");
    const emailUsuario   = usuarioLogado.email || "";

    const textoMensagem = mensagem.trim() || `Olá! Gostaria de saber mais sobre o(a) ${animal.nome}.`;

    try {
      setEnviando(true);
      const resposta = await fetch(`${URL_API}/contatos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email: emailUsuario,
          mensagem: textoMensagem,
          tipo: "adocao",
          animalNome: animal.nome,
          animalId: animal._id,
        }),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao enviar interesse.");
      }

      setEnviado(true);
      setNome("");
      setMensagem("");
    } catch (erro) {
      setErro("Erro ao enviar. Tente novamente em instantes.");
      console.error(erro);
    } finally {
      setEnviando(false);
    }
  }

  /* ── Carregando ── */
  if (carregando) {
    return (
      <>
        <Header />
        <main className="detalhe-page">
          <p style={{ textAlign: "center", padding: 60 }}>Carregando...</p>
        </main>
        <Footer />
      </>
    );
  }

  /* ── Não encontrado ── */
  if (naoEncontrado || !animal) {
    return (
      <>
        <Header />
        <main className="detalhe-page">
          <p style={{ textAlign: "center", padding: 60 }}>Animal não encontrado.</p>
          <div style={{ textAlign: "center" }}>
            <button className="btn-voltar" onClick={() => navigate('/animais')}>
              Voltar à galeria
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="detalhe-page">

        <button className="btn-voltar" onClick={() => navigate('/animais')}>
          Voltar a galeria
        </button>

        <div className="detalhe-hero">
          <div className="detalhe-img-wrap">
            <div className="tag-disp">
              {animal.status === "adotado" ? "Adotado" : "Disponível"}
            </div>

            {/* ── Botão coração ── */}
            <button
              className={`btn-coracao ${interesse ? "ativo" : ""}`}
              onClick={handleClickAdotar}
              aria-label={interesse ? "Remover interesse" : "Adicionar interesse"}
            >
              <Heart
                size={20}
                fill={interesse ? "#e74c3c" : "transparent"}
                color={interesse ? "#e74c3c" : "#ffffff"}
                strokeWidth={2}
              />
            </button>

            <img
              src={resolverImagem(animal.imagem || animal.img)}
              alt={"Foto de " + animal.nome}
              onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Sem+foto"; }}
            />
          </div>

          <div className="detalhe-info">
            <span className="especie-badge">{animal.especie}</span>
            <h1>{animal.nome}</h1>
            <p className="desc">{animal.descricao || animal.desc}</p>

            <div className="attrs-grid">
              <div className="attr-card">
                <span>Idade</span>
                <strong>{animal.idade ? `${animal.idade} ano${animal.idade !== 1 ? "s" : ""}` : "—"}</strong>
              </div>
              <div className="attr-card">
                <span>Sexo</span>
                <strong>{animal.sexo || "—"}</strong>
              </div>
              <div className="attr-card">
                <span>Porte</span>
                <strong>{animal.porte || "—"}</strong>
              </div>
              <div className="attr-card">
                <span>Tipo</span>
                <strong>{animal.especie}</strong>
              </div>
            </div>

            {animal.historia && (
              <div className="sobre-card">
                <h3>Sobre {animal.nome}</h3>
                <p>{animal.historia}</p>
              </div>
            )}

            <div className="detalhe-actions">
              <button className="btn-interesse" onClick={handleClickAdotar}>
                {usuarioEstaLogado() ? "Tenho interesse" : "Entrar para adotar"}
              </button>

              {animal.whatsapp && (
                <a
                  className="btn-whatsapp"
                  href={"https://wa.me/" + animal.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.057 23.886a.5.5 0 0 0 .611.632l6.218-1.634A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.031-1.388l-.36-.214-3.733.981.998-3.648-.235-.374A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                  WhatsApp
                </a>
              )}
            </div>

            {!usuarioEstaLogado() && (
              <p style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                Você precisa estar logado para demonstrar interesse em adoção.
              </p>
            )}
          </div>
        </div>

        <div className="detalhe-form-contato">
          <h2>Quer saber mais sobre {animal.nome}?</h2>
          <div className="detalhe-form-row">
            <div className="detalhe-form-group">
              <label>Seu nome</label>
              <input
                type="text"
                placeholder="Como podemos te chamar?"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="detalhe-form-group">
              <label>Email</label>
              <input type="text" disabled placeholder="Será usado o seu app de email" />
            </div>
          </div>
          <div className="detalhe-form-group">
            <label>Mensagem</label>
            <textarea
              rows={3}
              placeholder={`Olá! Gostaria de saber mais sobre o(a) ${animal.nome}.`}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
          </div>
          <div className="detalhe-form-footer">
            {erro && <p style={{ color: "red", fontSize: "13px" }}>{erro}</p>}
            {enviado && (
              <p style={{ color: "#0a9b6f", fontSize: "13px" }}>
                ✅ Interesse enviado! Em breve nossa equipe entrará em contato.
              </p>
            )}
            <button className="btn-enviar" onClick={handleEnviar} disabled={enviando}>
              {enviando
                ? "Enviando..."
                : usuarioEstaLogado() ? "Enviar interesse" : "Entrar para enviar"}
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}

export default DetalheAnimal;
