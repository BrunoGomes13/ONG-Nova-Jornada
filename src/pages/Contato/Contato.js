import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const URL_API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function Contato() {
    /* ── Estados do formulário ── */
    const [nome, setNome]         = useState("");
    const [email, setEmail]       = useState("");
    const [mensagem, setMensagem] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [feedback, setFeedback] = useState(null); // { tipo: "sucesso"|"erro", texto: "" }

    /* ── Envia o formulário para o backend ── */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);

        if (!nome.trim() || !email.trim() || !mensagem.trim()) {
            setFeedback({ tipo: "erro", texto: "Preencha todos os campos." });
            return;
        }

        try {
            setEnviando(true);
            const resposta = await fetch(`${URL_API}/contatos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, mensagem, tipo: "geral" }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.mensagem || "Erro ao enviar mensagem.");
            }

            setFeedback({ tipo: "sucesso", texto: "Mensagem enviada com sucesso! Em breve entraremos em contato." });
            setNome("");
            setEmail("");
            setMensagem("");
        } catch (erro) {
            setFeedback({ tipo: "erro", texto: erro.message || "Erro ao conectar com o servidor." });
        } finally {
            setEnviando(false);
        }
    };

    return (
        <>
            <Header />

            <main style={{
                padding: "60px 80px",
                minHeight: "500px",
                backgroundColor: "#f8f8f8"
            }}>
                <section style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    padding: "40px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                }}>
                    <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
                        Entre em Contato
                    </h1>

                    <p style={{ fontSize: "18px", marginBottom: "30px", color: "#555" }}>
                        Ficou com alguma dúvida, quer ajudar ou deseja saber mais sobre a ONG Nova Jornada Animal?
                        Envie uma mensagem para nossa equipe.
                    </p>

                    {/* ── Feedback de sucesso/erro ── */}
                    {feedback && (
                        <p style={{
                            padding: "12px 16px",
                            borderRadius: "10px",
                            marginBottom: "18px",
                            fontSize: "14px",
                            backgroundColor: feedback.tipo === "sucesso" ? "#e6f9f3" : "#fdeaea",
                            color: feedback.tipo === "sucesso" ? "#0a9b6f" : "#c0392b",
                            border: `1px solid ${feedback.tipo === "sucesso" ? "#0a9b6f33" : "#c0392b33"}`,
                        }}>
                            {feedback.texto}
                        </p>
                    )}

                    {/* ── Formulário de contato ── */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            style={inputStyle}
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Seu email"
                            style={inputStyle}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <textarea
                            placeholder="Digite sua mensagem"
                            rows="5"
                            style={inputStyle}
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            required
                        ></textarea>

                        <button type="submit" style={buttonStyle} disabled={enviando}>
                            {enviando ? "Enviando..." : "Enviar mensagem"}
                        </button>
                    </form>
                </section>

                {/* ── Botão flutuante do WhatsApp ── */}
                <a
                    href="https://wa.me/558382247741"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={whatsappButton}
                >
                    WhatsApp
                </a>
            </main>

            <Footer />
        </>
    )
}

const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
}

const buttonStyle = {
    backgroundColor: "#00c7b7",
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    borderRadius: "25px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
}

const whatsappButton = {
    position: "fixed",
    right: "30px",
    bottom: "30px",
    backgroundColor: "#25D366",
    color: "#fff",
    padding: "16px 24px",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    zIndex: "1000"
}

export default Contato
