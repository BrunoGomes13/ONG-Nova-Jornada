import "./Footer.css";
import { Link } from "react-router-dom";
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
            <nav className="menu-navegacao" aria-label="Menu-Segundário">
                <h4>Navegação</h4>
                <ul>
                    <Link to="/projetos"><li>Projetos</li></Link>
                    <Link to="/animais"><li>Animais</li></Link>
                    <Link to="/contato"><li>Contato</li></Link>
                </ul>
            </nav>
            <div className="redes-sociais">
                <h4>Conecte-se</h4>
                <Link to="/"><i className="fa-brands fa-instagram"></i></Link>
                <Link to="/"><i className="fa-brands fa-facebook"></i></Link>
                <Link to="/"><i className="fa-brands fa-whatsapp"></i></Link>
                <p>contato@ongpmb.org <br/> <br/>(11) 4002-8922</p>
            </div>
            <p className="rodape-direitos">&copy; 2026 ONG Nova Jornada Animal. Feito com 💙 por quem ama os animais</p>
        </footer>
    );
}

export default Footer;