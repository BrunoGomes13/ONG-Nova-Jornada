const mongoose = require("mongoose");

/* ── Schema do modelo de Relato ── */
const esquemaRelato = new mongoose.Schema(
  {
    nome: {
      type:     String,
      required: [true, "Nome é obrigatório"],
      trim:     true,
    },
    animal: {
      type:     String,
      required: [true, "Nome do animal é obrigatório"],
      trim:     true,
    },
    relato: {
      type:     String,
      required: [true, "Relato é obrigatório"],
      trim:     true,
    },
    imagem: {
      type:    String,
      trim:    true,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "relatos",
  }
);

module.exports = mongoose.model("Relato", esquemaRelato);
