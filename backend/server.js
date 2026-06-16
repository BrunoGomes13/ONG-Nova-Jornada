require("dotenv").config();
const aplicacao = require("./app");
const conectarBancoDeDados = require("./config/db");

const PORTA = process.env.PORTA || 5000;

/* ── Conecta ao MongoDB Atlas e inicia o servidor ── */
const iniciarServidor = async () => {
  try {
    /* ── 1. Conecta ao banco de dados ── */
    await conectarBancoDeDados();

    /* ── 2. Inicia o servidor HTTP ── */
    aplicacao.listen(PORTA, () => {
      console.log("══════════════════════════════════════");
      console.log(`🚀 Servidor rodando na porta ${PORTA}`);
      console.log(`🌐 Acesse: http://localhost:${PORTA}`);
      console.log(`📦 Ambiente: ${process.env.NODE_ENV || "development"}`);
      console.log("══════════════════════════════════════");
    });
  } catch (erro) {
    console.error("❌ Falha ao iniciar o servidor:", erro);
    process.exit(1);
  }
};

iniciarServidor();
