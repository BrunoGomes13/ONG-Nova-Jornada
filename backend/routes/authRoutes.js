const express                                   = require("express");
const { registrar, login, buscarMeuPerfil }     = require("../controllers/authController");
const verificarAutenticacao                     = require("../middlewares/authMiddleware");

const roteadorAuth = express.Router();

/* ── POST /api/auth/register ── */
roteadorAuth.post("/register", registrar);

/* ── POST /api/auth/login ── */
roteadorAuth.post("/login", login);

/* ── GET /api/auth/me (protegido) ── */
roteadorAuth.get("/me", verificarAutenticacao, buscarMeuPerfil);

module.exports = roteadorAuth;
