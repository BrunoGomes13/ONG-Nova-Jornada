const mongoose = require("mongoose");

/* ── Schema do modelo de Projeto ── */
const esquemaProjeto = new mongoose.Schema(
  {
    titulo: {
      type:     String,
      required: [true, "Título do projeto é obrigatório"],
      trim:     true,
    },
    descricao: {
      type: String,
      trim: true,
    },
    objetivo: {
      type: String,
      trim: true,
    },
    imagem: {
      type: String,
      trim: true,
    },
    ativo: {
      type:    Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "projetos",
  }
);

module.exports = mongoose.model("Projeto", esquemaProjeto);
