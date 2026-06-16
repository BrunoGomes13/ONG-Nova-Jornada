const express = require("express");
const {
  listarUsuarios,
  buscarUsuarioPorId,
  deletarUsuario,
  buscarDashboard,
} = require("../controllers/usuarioController");

const verificarAutenticacao = require("../middlewares/authMiddleware");
const verificarPermissao    = require("../middlewares/roleMiddleware");

const roteadorUsuarios  = express.Router();
const roteadorDashboard = express.Router();

/* ── Rotas de usuários (somente admin) ── */
roteadorUsuarios.get(   "/",    verificarAutenticacao, verificarPermissao("admin"), listarUsuarios);
roteadorUsuarios.get(   "/:id", verificarAutenticacao, verificarPermissao("admin"), buscarUsuarioPorId);
roteadorUsuarios.delete("/:id", verificarAutenticacao, verificarPermissao("admin"), deletarUsuario);

/* ── Rota do dashboard (somente admin) ── */
roteadorDashboard.get("/", verificarAutenticacao, verificarPermissao("admin"), buscarDashboard);

module.exports = { roteadorUsuarios, roteadorDashboard };
