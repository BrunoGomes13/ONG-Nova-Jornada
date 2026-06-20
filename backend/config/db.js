const mongoose = require("mongoose");

/* ── Conecta ao MongoDB Atlas usando a URI do .env ── */
const conectarBancoDeDados = async () => {
  try {
    const conexao = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS:          45000,
    });

    console.log(`✅ MongoDB Atlas conectado: ${conexao.connection.host}`);
  } catch (erro) {
    console.error("❌ Erro ao conectar no MongoDB Atlas:", erro.message);
    process.exit(1);
  }
};

module.exports = conectarBancoDeDados;
