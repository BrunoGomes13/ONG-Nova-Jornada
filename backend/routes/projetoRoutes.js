const express = require("express");
const {
  listarProjetos,
  buscarProjetoPorId,
  criarProjeto,
  atualizarProjeto,
  deletarProjeto,
} = require("../controllers/projetoController");

const verificarAutenticacao = require("../middlewares/authMiddleware");
const verificarPermissao    = require("../middlewares/roleMiddleware");

const roteadorProjetos = express.Router();

/* ── Rotas públicas ── */
roteadorProjetos.get("/",    listarProjetos);
roteadorProjetos.get("/:id", buscarProjetoPorId);

/* ── Rotas protegidas (somente admin) ── */
roteadorProjetos.post(  "/",    verificarAutenticacao, verificarPermissao("admin"), criarProjeto);
roteadorProjetos.put(   "/:id", verificarAutenticacao, verificarPermissao("admin"), atualizarProjeto);
roteadorProjetos.delete("/:id", verificarAutenticacao, verificarPermissao("admin"), deletarProjeto);

module.exports = roteadorProjetos;
