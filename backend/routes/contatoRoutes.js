const express = require("express");
const {
  criarContato,
  listarContatos,
  marcarComoLido,
  deletarContato,
} = require("../controllers/contatoController");

const verificarAutenticacao = require("../middlewares/authMiddleware");
const verificarPermissao    = require("../middlewares/roleMiddleware");

const roteadorContatos = express.Router();

/* ── Rota pública: qualquer visitante pode enviar uma mensagem ── */
roteadorContatos.post("/", criarContato);

/* ── Rotas protegidas (somente admin) ── */
roteadorContatos.get(   "/",        verificarAutenticacao, verificarPermissao("admin"), listarContatos);
roteadorContatos.put(   "/:id/lido",verificarAutenticacao, verificarPermissao("admin"), marcarComoLido);
roteadorContatos.delete("/:id",     verificarAutenticacao, verificarPermissao("admin"), deletarContato);

module.exports = roteadorContatos;
