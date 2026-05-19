import "./QuemSomos.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { Target, Eye, HeartHandshake } from "lucide-react";

import pessoaAnimal from "../../assets/projects/card-1.jpg";
import criancasAnimal from "../../assets/projects/card-2.jpg";

function QuemSomos() {
  return (
    <>
      <Header />

      <section className="quem-somos">
        <div className="quem-somos-container">
          <div className="quem-somos-content">
            <span className="subtitulo">Quem Somos</span>

            <h1>
              Uma história movida a amor pelos animais
            </h1>

            <p>
              Fundada em 2010 por um grupo de voluntários, a ONG PMB nasceu do
              desejo de transformar a realidade dos animais em situação de
              vulnerabilidade. Hoje somos referência em resgate, reabilitação e
              adoção responsável.
            </p>

            <p>
              Em mais de 14 anos, ajudamos mais de 1.200 animais a encontrarem
              novas famílias, sempre com acompanhamento veterinário, castração e
              socialização.
            </p>
          </div>

          <div className="quem-somos-images">
            <img src={pessoaAnimal} alt="Pessoa segurando cachorro" />

            <img
              src={criancasAnimal}
              alt="Crianças segurando cachorro"
            />
          </div>
        </div>

        <div className="cards-container">
          <div className="info-card">
            <div className="icon blue">
              <Target size={28} />
            </div>

            <h3>Missão</h3>

            <p>
              Promover o resgate, cuidado e adoção de animais em situação de
              risco, atuando com ética e responsabilidade.
            </p>
          </div>

          <div className="info-card">
            <div className="icon green">
              <Eye size={28} />
            </div>

            <h3>Visão</h3>

            <p>
              Ser referência nacional em proteção animal, inspirando uma
              sociedade mais empática e consciente.
            </p>
          </div>

          <div className="info-card">
            <div className="icon orange">
              <HeartHandshake size={28} />
            </div>

            <h3>Valores</h3>

            <p>
              Empatia, respeito à vida, transparência, colaboração comunitária
              e compromisso com o bem-estar animal.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default QuemSomos;