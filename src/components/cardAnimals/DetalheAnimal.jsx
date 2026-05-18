import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import animais from '../../data/animais.json';
import "./DetalheAnimal.css";

// Função auxiliar que monta o caminho dinâmico da imagem usando require(), que é necessario para o webpack processar e empacotar o arquivo.
function getImagem(nomeArquivo) {
  return require("../../assets/animals/" + nomeArquivo);
}

// Componente de página que exibe os detalhes completos de um animal para adoção. Usa o id para identificar os dados do animal no Json.
function DetalheAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = animais.find((a) => a.id === Number(id));

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
              <button className="btn-interesse">Tenho interesse</button>
              <a
                className="btn-whatsapp"
                href={"https://wa.me/" + animal.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
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
              <input type="text" placeholder="Como podemos te chamar?" />
            </div>
            <div className="detalhe-form-group">
              <label>Email</label>
              <input type="email" placeholder="voce@email.com" />
            </div>
          </div>
          <div className="detalhe-form-group">
            <label>Mensagem</label>
            <textarea rows={3} placeholder={"Ola! Gostaria de saber mais sobre o(a) " + animal.nome + "."} />
          </div>
          <div className="detalhe-form-footer">
            <button className="btn-enviar">Enviar interesse</button>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}

export default DetalheAnimal;