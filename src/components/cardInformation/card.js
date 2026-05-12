import "./card.css";

function Card() {
    return (
        <section id="cards-informacao">
            <div className="card-1">
                <span className="material-symbols-outlined">group</span>
                <p className="realce">1200+</p>
                <p >Resgates realizados</p>
            </div>
            <div className="card-2">
                <span className="material-symbols-outlined">group</span>
                <p className="realce">1200+</p>
                <p >Adoções felizes</p>
            </div>
            <div className="card-3">
                <span className="material-symbols-outlined">group</span>
                <p className="realce">1200+</p>
                <p>Animais aguardando adoção</p>
            </div>
        </section>
    );
}

export default Card;