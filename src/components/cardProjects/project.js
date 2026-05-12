import "./project.css";
import foto1 from "../../assents/projects/card-1.jpg";
import foto2 from "../../assents/projects/card-2.jpg";
import foto3 from "../../assents/projects/card-3.jpg";

function CardProject() {
    return (
        <section id="card-project">
            <div className="card">
                <img src={foto1} alt="Foto do Projeto recuperando animais" />
                <div className="card-conteudo">
                    <span>+ 1.200 resgates  </span>
                    <h3>Projeto de Adoção</h3>
                    <p>Equipe especializada que atua 24h no resgate de animais em situação de risco, abandono ou maus-tratos.</p>
                </div>
            </div>
            <div className="card">
                <img src={foto2} alt="Foto do Projeto recuperando animais" />
                <div className="card-conteudo">
                    <span>+ 800 Ações  </span>
                    <h3>Feiras de Adoção</h3>
                    <p>Eventos mensais em parceria com prefeituras e empresas para conectar famílias a animais que precisam de um lar.</p>
                </div>
            </div>
            <div className="card">
                <img src={foto3} alt="Foto do Projeto recuperando animais" />
                <div className="card-conteudo"><span>+ 50 escolas </span>
                    <h3>Educação e Conscientização</h3>
                    <p>Palestras em escolas e campanhas digitais sobre posse responsável, castração e respeito aos animais.</p>
                </div>
            </div>
        </section>

    );
}
export default CardProject;