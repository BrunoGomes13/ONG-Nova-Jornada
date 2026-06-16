const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

/* ── Schema do modelo de Usuário ── */
const esquemaUsuario = new mongoose.Schema(
  {
    nome: {
      type:     String,
      required: [true, "Nome é obrigatório"],
      trim:     true,
    },
    email: {
      type:     String,
      required: [true, "Email é obrigatório"],
      unique:   true,
      trim:     true,
      lowercase: true,
    },
    senha: {
      type:     String,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
      /* ── Não retorna a senha nas consultas por padrão ── */
      select:   false,
    },
    role: {
      type:    String,
      enum:    ["cliente", "admin"],
      default: "cliente",
    },
  },
  {
    /* ── Adiciona createdAt e updatedAt automaticamente ── */
    timestamps: true,
    /* ── Nome da coleção no MongoDB Atlas ── */
    collection: "usuarios",
  }
);

/* ── Hash da senha antes de salvar ── */
esquemaUsuario.pre("save", async function (proximo) {
  /* ── Só faz o hash se a senha foi modificada ── */
  if (!this.isModified("senha")) return proximo();

  const sal  = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, sal);
  proximo();
});

/* ── Método para comparar senha digitada com hash ── */
esquemaUsuario.methods.verificarSenha = async function (senhaDigitada) {
  return bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model("Usuario", esquemaUsuario);
