import "./Relatos.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import CardRelato from "../../components/cardRelatos/CardRelato";

function Relatos() {

    const relatos = [
        {
            id: 1,
            nome: "Maria Clara",
            animal: "Thor",
            relato:
                "Adotar o Thor foi uma das melhores decisões da minha vida.",
            imagem:
                "https://images.unsplash.com/photo-1517849845537-4d257902454a"
        },

        {
            id: 2,
            nome: "João Pedro",
            animal: "Luna",
            relato:
                "A Luna chegou muito tímida, mas hoje é extremamente carinhosa.",
            imagem:
                "https://images.unsplash.com/photo-1518791841217-8f162f1e1131"
        },

        {
            id: 3,
            nome: "Ana Beatriz",
            animal: "Mel",
            relato:
                "A Mel trouxe felicidade para toda a casa.",
            imagem:
                "https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
        }
    ];

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

                    {relatos.map((relato) => (

                        <CardRelato
                            key={relato.id}
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