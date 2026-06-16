const mongoose = require("mongoose");

/* ── Schema do modelo de Animal ── */
const esquemaAnimal = new mongoose.Schema(
  {
    nome: {
      type:     String,
      required: [true, "Nome do animal é obrigatório"],
      trim:     true,
    },
    especie: {
      type:     String,
      required: [true, "Espécie é obrigatória"],
      trim:     true,
    },
    raca: {
      type:  String,
      trim:  true,
      default: "SRD",
    },
    idade: {
      type: Number,
      min:  [0, "Idade não pode ser negativa"],
    },
    sexo: {
      type: String,
      enum: ["Macho", "Fêmea", ""],
    },
    porte: {
      type: String,
      enum: ["Pequeno", "Médio", "Grande", ""],
    },
    descricao: {
      type: String,
      trim: true,
    },
    status: {
      type:    String,
      enum:    ["disponivel", "adotado"],
      default: "disponivel",
    },
    imagem: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "animals",
  }
);

module.exports = mongoose.model("Animal", esquemaAnimal);
