const mongoose = require("mongoose");

/* ── Schema do modelo de Contato (mensagens enviadas pelo site) ── */
const esquemaContato = new mongoose.Schema(
  {
    nome: {
      type:     String,
      required: [true, "Nome é obrigatório"],
      trim:     true,
    },
    email: {
      type:     String,
      required: [true, "Email é obrigatório"],
      trim:     true,
      lowercase: true,
    },
    mensagem: {
      type:     String,
      required: [true, "Mensagem é obrigatória"],
      trim:     true,
    },
    /* ── Tipo de origem do contato: formulário geral ou interesse em adoção ── */
    tipo: {
      type:    String,
      enum:    ["geral", "adocao"],
      default: "geral",
    },
    /* ── Se for sobre adoção, guarda referência do animal ── */
    animalNome: {
      type:    String,
      trim:    true,
      default: "",
    },
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  "Animal",
      required: false,
    },
    /* ── Se já foi lido pelo admin ── */
    lido: {
      type:    Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "contatos",
  }
);

module.exports = mongoose.model("Contato", esquemaContato);
