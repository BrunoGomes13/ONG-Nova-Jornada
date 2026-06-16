const express = require("express");
const {
  listarAnimais,
  buscarAnimalPorId,
  criarAnimal,
  atualizarAnimal,
  deletarAnimal,
} = require("../controllers/animalController");

const verificarAutenticacao = require("../middlewares/authMiddleware");
const verificarPermissao    = require("../middlewares/roleMiddleware");

const roteadorAnimais = express.Router();

/* ── Rotas públicas ── */
roteadorAnimais.get("/",    listarAnimais);
roteadorAnimais.get("/:id", buscarAnimalPorId);

/* ── Rotas protegidas (somente admin) ── */
roteadorAnimais.post(  "/",    verificarAutenticacao, verificarPermissao("admin"), criarAnimal);
roteadorAnimais.put(   "/:id", verificarAutenticacao, verificarPermissao("admin"), atualizarAnimal);
roteadorAnimais.delete("/:id", verificarAutenticacao, verificarPermissao("admin"), deletarAnimal);

module.exports = roteadorAnimais;
