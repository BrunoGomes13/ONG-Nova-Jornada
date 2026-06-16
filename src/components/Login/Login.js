import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { login, registrar } from "../../services/adminApi";

function Login() {
  /* ── Estados do formulário ── */
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isCadastro, setIsCadastro]     = useState(false);
  const [email, setEmail]               = useState("");
  const [senha, setSenha]               = useState("");
  const [nome, setNome]                 = useState("");
  const [carregando, setCarregando]     = useState(false);

  const navegar = useNavigate();

  /* ── Submissão do formulário ── */
  const handleSubmit = async (e) => {
    e.preventDefault(); /* ← impede recarregar a página */
    setCarregando(true);

    try {
      if (isCadastro) {
        /* ── CADASTRO ── */
        const data = await registrar(nome, email, senha);

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          navegar("/");
        } else {
          alert(data.mensagem || "Erro ao cadastrar.");
        }
      } else {
        /* ── LOGIN ── */
        const data = await login(email, senha);

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data.usuario));

          /* ── Redireciona conforme o perfil ── */
          if (data.usuario.role === "admin") {
            navegar("/adm/dashboard"); /* ← painel admin */
          } else {
            navegar("/");             /* ← home normal */
          }
        } else {
          alert(data.mensagem || "Credenciais inválidas.");
        }
      }
    } catch (erro) {
      alert("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container-login">
        {/* ── onSubmit adicionado aqui ── */}
        <form className="form-login" onSubmit={handleSubmit}>
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
            <button
              type="button"
              className={!isCadastro ? "tab ativo" : "tab"}
              onClick={() => setIsCadastro(false)}
            >
              Entrar
            </button>
            <button
              type="button"
              className={isCadastro ? "tab ativo" : "tab"}
              onClick={() => setIsCadastro(true)}
            >
              Cadastrar
            </button>
          </div>

          {/* ── Campo nome (só no cadastro) ── */}
          {isCadastro && (
            <div className="elementos-login">
              <label htmlFor="nome">Nome</label>
              <div className="input-box">
                <span className="material-symbols-outlined">person</span>
                <input
                  type="text"
                  id="nome"
                  required
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ── Campo email ── */}
          <div className="elementos-login">
            <label htmlFor="email">Email</label>
            <div className="input-box">
              <span className="material-symbols-outlined">mail</span>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* ── Campo senha ── */}
          <div className="elementos-login">
            <label htmlFor="password">Senha</label>
            <div className="input-box">
              <span className="material-symbols-outlined">lock</span>
              <input
                type={mostrarSenha ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <span
                className="material-symbols-outlined olho"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? "visibility_off" : "visibility"}
              </span>
            </div>
          </div>

          {/* ── Opções (só no login) ── */}
          {!isCadastro && (
            <div className="opcoes-login">
              <div className="lembrar">
                <input type="checkbox" id="lembrar" />
                <label htmlFor="lembrar">Lembrar</label>
              </div>
              <Link to="">Esqueci a senha</Link>
            </div>
          )}

          {/* ── Botão de submit ── */}
          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? "Aguarde..." : isCadastro ? "Criar conta" : "Entrar"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;