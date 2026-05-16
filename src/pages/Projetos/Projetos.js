import "./Projetos.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardProject from "../../components/cardProjects/Project";

function Projetos() {
    return (
        <>
            <Header />
            <main id="container-projects">
                    <h1>Iniciativas que transformam vidas</h1>
                    <p className="descricao">Cada projeto da ONG PMB nasce de uma necessidade real. Conheça nossas frentes de trabalho e veja como você pode apoiar.</p>
                    <CardProject />
            </main>
            <Footer />
        </>
    )
}
export default Projetos;