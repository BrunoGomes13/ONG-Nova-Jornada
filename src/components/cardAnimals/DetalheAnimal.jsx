import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import animais from '../../data/animais.json';
import "./DetalheAnimal.css";

// Funcao auxiliar que monta o caminho dinâmico da imagem usando require(), que é necessario para o webpack processar e empacotar o arquivo.
function getImagem(nomeArquivo) {
  return require("../../assets/animals/" + nomeArquivo);
}

// Componente de página que exibe os detalhes completos de um animal para adoção. Usa o id para identificar os dados do animal no Json.
function DetalheAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = animais.find((a) => a.id === Number(id));

  // Atualiza o estado de interesse
  const [interesse, setInteresse] = useState(() => {
  const salvo = JSON.parse(localStorage.getItem('favoritos') || '[]');
  return salvo.includes(animal.id);
});

function toggleFavorito() {
  const salvo = JSON.parse(localStorage.getItem('favoritos') || '[]');
  const novo = interesse
    ? salvo.filter((id) => id !== animal.id)
    : [...salvo, animal.id];
  localStorage.setItem('favoritos', JSON.stringify(novo));
  setInteresse(!interesse);
}

// Funcao que prepara o email para enviar pelo app do usuario.
function handleEnviar() {
  if (!nome.trim()) {
    setErro("Por favor, informe seu nome.");
    return;
  }
  setErro("");

  const ONG_EMAIL = "alan.chagas@maisunifacisa.com.br";
  const assunto = encodeURIComponent(`Estou interessado em adotar o animal ${animal.nome}`);
  const corpo = encodeURIComponent(
    mensagem.trim() || `Olá! Gostaria de saber mais sobre o(a) ${animal.nome}.`
  );

  window.location.href = `mailto:${ONG_EMAIL}?subject=${assunto}&body=${corpo}`;
}

  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

// Rola a página para o topo (posição 0,0) assim que o componente é montado.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

// Mensagem de erro caso não encontre o id de um animal.
  if (!animal) return <p>Animal não encontrado.</p>;

  return (
    <>
      <Header />

      <main className="detalhe-page">

        <button className="btn-voltar" onClick={() => navigate('/animais')}>
          Voltar a galeria
        </button>

        <div className="detalhe-hero">
          <div className="detalhe-img-wrap">
            <div className="tag-disp">Disponivel</div>
 
            {/* Botao coração (Tenho interesse) */}
            <button
              className={`btn-coracao ${interesse ? "ativo" : ""}`}
              onClick={() => toggleFavorito()}
              aria-label={interesse ? "Remover interesse" : "Adicionar interesse"}
            >
              <Heart
                size={20}
                fill={interesse ? "#e74c3c" : "transparent"}
                color={interesse ? "#e74c3c" : "#ffffff"}
                strokeWidth={2}
              />
            </button>

            <img src={getImagem(animal.img)} alt={"Foto de " + animal.nome} />
          </div>

          <div className="detalhe-info">
            <span className="especie-badge">{animal.especie}</span>
            <h1>{animal.nome}</h1>
            <p className="desc">{animal.desc}</p>

            <div className="attrs-grid">
              <div className="attr-card">
                <span>Idade</span>
                <strong>{animal.idade}</strong>
              </div>
              <div className="attr-card">
                <span>Sexo</span>
                <strong>{animal.sexo}</strong>
              </div>
              <div className="attr-card">
                <span>Porte</span>
                <strong>{animal.porte}</strong>
              </div>
              <div className="attr-card">
                <span>Tipo</span>
                <strong>{animal.especie}</strong>
              </div>
            </div>

            <div className="sobre-card">
              <h3>Sobre {animal.nome}</h3>
              <p>{animal.historia}</p>
            </div>

            <div className="detalhe-actions">           
              <button
                className="btn-interesse"
                onClick={() => toggleFavorito()}
              >
                Tenho interesse
              </button>

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
              
            </div>
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
            <button className="btn-enviar" onClick={handleEnviar}>
              Enviar interesse
            </button>
          </div>
      </div>

      </main>

      <Footer />
    </>
  );
}

export default DetalheAnimal;