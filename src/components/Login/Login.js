import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
function Login() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [isCadastro, setIsCadastro] = useState(false);
    return (
        <>
        <Header />
    <div className="container-login">
            <form className="form-login">
                <Link to="/" className="voltar">
                    <span className="material-symbols-outlined">arrow_back</span>Voltar ao site
                </Link>
                <div className="logo">
                    <span className="material-symbols-outlined">pets</span>
                    <div>
                        <span>ONG PMB</span>
                        <p>Proteção Animal</p>
                    </div>
                </div>
                <div className="tabs-login">
                    <button type="button" className={!isCadastro ? "tab ativo" : "tab"}onClick={() => setIsCadastro(false)}>
                        Entrar
                    </button>
                    <button type="button"className={isCadastro ? "tab ativo" : "tab"}onClick={() => setIsCadastro(true)}>
                        Cadastrar
                    </button>
                </div>
                {
                    isCadastro && (
                        <div className="elementos-login">
                            <label htmlFor="nome">Nome</label>
                            <div className="input-box">
                                <span className="material-symbols-outlined">person</span>
                                <input type="text"id="nome" required placeholder="Seu nome"/>
                            </div>
                        </div>
                    )
                }
                <div className="elementos-login">
                    <label htmlFor="email">Email</label>
                    <div className="input-box">
                        <span className="material-symbols-outlined">mail</span>
                        <input type="email"id="email"name="email"required placeholder="voce@email.com"/>
                    </div>
                </div>
                <div className="elementos-login">
                    <label htmlFor="password">Senha</label>
                    <div className="input-box">
                        <span className="material-symbols-outlined">lock</span>
                        <input type={mostrarSenha ? "text" : "password"}id="password"name="password"required placeholder="Digite sua senha"/>
                        <span
                            className="material-symbols-outlined olho"
                            onClick={() =>
                                setMostrarSenha(!mostrarSenha)
                            }
                        >
                            {
                                mostrarSenha
                                    ? "visibility_off"
                                    : "visibility"
                            }
                        </span>
                    </div>
                </div>

                {
                    !isCadastro && (
                        <div className="opcoes-login">
                            <div className="lembrar">
                                <input type="checkbox"id="lembrar"/>
                                <label htmlFor="lembrar">Lembrar</label>
                            </div>
                            <Link to="">Esqueci a senha</Link>
                        </div>
                    )
                }
                <button type="submit"className="btn-entrar">
                    {
                        isCadastro? "Criar conta": "Entrar"
                    }
                </button>
            </form>
        </div>
        <Footer />
        </>
    );
}
export default Login;