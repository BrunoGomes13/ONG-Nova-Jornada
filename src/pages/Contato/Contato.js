import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Contato() {
    return (
        <>
            <Header />

        {/* Conteúdo principal da página */}
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

                
                    {/* Formulário de contato */}
                    <form>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            style={inputStyle}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Seu email"
                            style={inputStyle}
                            required
                        />

                        <textarea
                            placeholder="Digite sua mensagem"
                            rows="5"
                            style={inputStyle}
                            required
                        ></textarea>

                        <button type="submit" style={buttonStyle}>
                            Enviar mensagem
                        </button>
                    </form>
                </section>

                {/* Botão flutuante do WhatsApp */}
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

// Estilo dos campos do formulário
const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none"
}

// Estilo do botão de envio
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

// Estilo do botão flutuante do WhatsApp
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