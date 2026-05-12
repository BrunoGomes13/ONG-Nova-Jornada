import "../../components/cardInformation/card.css";
import "./cardAnimals.css";
import foto from "../../assents/animals/foto.jpg";
import foto1 from "../../assents/animals/thor.jpg";
import foto2 from "../../assents/animals/luna.jpg";
import foto3 from "../../assents/animals/mel.jpg";

function CardAnimals() {
    return (
        <section id="card-animals">
            {/* CARD 1 */}
            <div className="card">
                <img src={foto1} alt="Foto do Projeto recuperando animais" />
                <div className="card-conteudo">
                    <span>Thor  </span>
                    <p className="idade-animal">8 meses</p>
                    <p>Brincalhão e cheio de energia, adora crianças.</p>
                    <button className="btn-adotar-animal" type="button">Adotar</button>
                </div>
            </div>
            {/* CARD 2 */}
            <div className="card">
                <img src={foto2} alt="Foto do Projeto recuperando animais" />
                <div className="card-conteudo">
                    <span>Luna  </span>
                    <p className="idade-animal">5 meses</p>
                    <p>Docil e carinhosa, ama brincar e dormir no colo.</p>
                    <button className="btn-adotar-animal" type="button">Adotar</button>
                </div>
            </div>
            {/* CARD 3 */}
            <div className="card">
                <img src={foto} alt="Foto do Projeto recuperando animais" />
                <div className="card-conteudo">
                    <span>Bento  </span>
                    <p className="idade-animal">8 meses</p>
                    <p>Brincalhão e cheio de energia, adora crianças.</p>
                    <button className="btn-adotar-animal" type="button">Adotar</button>
                </div>
            </div>
            {/* CARD 4 */}
            <div className="card">
                <img src={foto3} alt="Foto do Projeto recuperando animais" />
                <div className="card-conteudo">
                    <span>Mel  </span>
                    <p className="idade-animal">8 meses</p>
                    <p>Brincalhão e cheio de energia, adora crianças.</p>
                    <button className="btn-adotar-animal" type="button">Adotar</button>
                </div>
            </div>
        </section>
    );
}
export default CardAnimals;