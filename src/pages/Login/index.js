import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const [mensagemErro, setMensagemErro] = useState("");

  const navegar = useNavigate();
  const localizacao = useLocation();
  /* ── Página de onde o usuário veio (ex: detalhe de um animal) ── */
  const paginaDeOrigem = localizacao.state?.de || null;

  /* ── Submissão do formulário ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro("");
    setCarregando(true);

    /* ── Limpa qualquer sessão anterior antes de logar/cadastrar.
       Evita que dados de um usuário antigo "vazem" para a nova sessão. ── */
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    try {
      if (isCadastro) {
        /* ── CADASTRO ── */
        const data = await registrar(nome, email, senha);

        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        /* ── Avisa o Header que o usuário mudou ── */
        window.dispatchEvent(new Event("usuarioAtualizado"));
        navegar(paginaDeOrigem || "/");
      } else {
        /* ── LOGIN ── */
        const data = await login(email, senha);

        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        /* ── Avisa o Header que o usuário mudou ── */
        window.dispatchEvent(new Event("usuarioAtualizado"));

        /* ── Redireciona conforme o perfil ── */
        if (data.usuario.role === "admin") {
          navegar("/adm/dashboard");
        } else {
          navegar(paginaDeOrigem || "/");
        }
      }
    } 
    catch (erro) {
      /* ── erro.message já vem com o texto exato do backend
         (ex: "Este email já está cadastrado.", "Credenciais inválidas.")
         Só usamos a mensagem genérica se for falha real de rede/conexão. ── */
      const ehFalhaDeRede = erro instanceof TypeError || erro.message === "Failed to fetch";
      setMensagemErro(
        ehFalhaDeRede
          ? "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente."
          : erro.message
      );
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container-login">
        <form className="form-login" onSubmit={handleSubmit}>
          <Link to="/" className="voltar">
            <span className="material-symbols-outlined">arrow_back</span>Voltar ao site
          </Link>

          <div className="logo">
            <span className="material-symbols-outlined">pets</span>
            <div>
              <span>ONG Nova Jornada Animal</span>
              <p>Proteção Animal</p>
            </div>
          </div>

          <div className="tabs-login">
            <button
              type="button"
              className={!isCadastro ? "tab ativo" : "tab"}
              onClick={() => { setIsCadastro(false); setMensagemErro(""); }}
            >
              Entrar
            </button>
            <button
              type="button"
              className={isCadastro ? "tab ativo" : "tab"}
              onClick={() => { setIsCadastro(true); setMensagemErro(""); }}
            >
              Cadastrar
            </button>
          </div>

          {/* ── Mensagem de erro inline, sem alert ── */}
          {mensagemErro && (
            <p style={{
              background: "rgba(248,113,113,0.1)",
              color: "#e53935",
              border: "1px solid rgba(248,113,113,0.3)",
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: 13,
              margin: 0,
            }}>
              {mensagemErro}
            </p>
          )}

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
