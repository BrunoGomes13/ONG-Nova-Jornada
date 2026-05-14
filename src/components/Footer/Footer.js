import "./Footer.css";
import "../Header/Header.css";
function Footer() {
    return (

        <footer className="rodape">
            <div className="logo">
                <span className="material-symbols-outlined">pets</span>
                <div>
                    <span>ONG Nova Jornada Animal</span>
                    <p>Proteção animal</p>
                </div>
            </div>
            <div className="redes-sociais">
                <h4>Conecte-se</h4>
                <a href="/"><i className="fa-brands fa-instagram"></i></a>
                <a href="/"><i className="fa-brands fa-facebook"></i></a>
                <a href="/"><i className="fa-brands fa-whatsapp"></i></a>
                <p>contato@ongpmb.org <br/>(11) 4002-8922</p>
            </div>
            <p className="rodape-direitos">&copy;  2026 ONG Nova Jornada Animal. Feito com 💙 por quem ama os animais</p>
        </footer>
    );
}

export default Footer;