const express = require("express");
const {
  listarRelatos,
  criarRelato,
  atualizarRelato,
  deletarRelato,
} = require("../controllers/relatoController");

const verificarAutenticacao = require("../middlewares/authMiddleware");
const verificarPermissao    = require("../middlewares/roleMiddleware");

const roteadorRelatos = express.Router();

/* ── Rota pública ── */
roteadorRelatos.get("/", listarRelatos);

/* ── Rotas protegidas (somente admin) ── */
roteadorRelatos.post(  "/",    verificarAutenticacao, verificarPermissao("admin"), criarRelato);
roteadorRelatos.put(   "/:id", verificarAutenticacao, verificarPermissao("admin"), atualizarRelato);
roteadorRelatos.delete("/:id", verificarAutenticacao, verificarPermissao("admin"), deletarRelato);

module.exports = roteadorRelatos;
