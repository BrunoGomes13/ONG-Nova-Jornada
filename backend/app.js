const express        = require("express");
const cors           = require("cors");
const helmet         = require("helmet");
const morgan         = require("morgan");
const tratadorErros  = require("./middlewares/errorHandler");

/* ── Importação das rotas ── */
const roteadorAuth    = require("./routes/authRoutes");
const roteadorAnimais = require("./routes/animalRoutes");
const roteadorProjetos= require("./routes/projetoRoutes");
const roteadorRelatos = require("./routes/relatoRoutes");
const roteadorContatos= require("./routes/contatoRoutes");
const { roteadorUsuarios, roteadorDashboard } = require("./routes/usuarioRoutes");

const aplicacao = express();

/* ══════════════════════════════════════
   MIDDLEWARES GLOBAIS
══════════════════════════════════════ */

/* ── Segurança com helmet ── */
aplicacao.use(helmet());

/* ── CORS: permite requisições do frontend ── */
aplicacao.use(
  cors({
    origin:      process.env.URL_FRONTEND || "http://localhost:3000",
    credentials: true,
    methods:     ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ── Parse do corpo das requisições em JSON ── */
aplicacao.use(express.json());
aplicacao.use(express.urlencoded({ extended: true }));

/* ── Log de requisições (apenas em desenvolvimento) ── */
if (process.env.NODE_ENV === "development") {
  aplicacao.use(morgan("dev"));
}

/* ══════════════════════════════════════
   ROTA DE VERIFICAÇÃO (Health Check)
══════════════════════════════════════ */
aplicacao.get("/", (requisicao, resposta) => {
  resposta.json({
    sucesso:  true,
    mensagem: "🐾 API Nova Jornada Animal está rodando!",
    versao:   "1.0.0",
    ambiente: process.env.NODE_ENV,
  });
});

/* ══════════════════════════════════════
   ROTAS DA API
══════════════════════════════════════ */
aplicacao.use("/api/auth",      roteadorAuth);
aplicacao.use("/api/animais",   roteadorAnimais);
aplicacao.use("/api/projetos",  roteadorProjetos);
aplicacao.use("/api/relatos",   roteadorRelatos);
aplicacao.use("/api/contatos",  roteadorContatos);
aplicacao.use("/api/usuarios",  roteadorUsuarios);
aplicacao.use("/api/dashboard", roteadorDashboard);

/* ── Rota não encontrada (404) ── */
aplicacao.use((requisicao, resposta) => {
  resposta.status(404).json({
    sucesso:  false,
    mensagem: `Rota ${requisicao.originalUrl} não encontrada.`,
  });
});

/* ══════════════════════════════════════
   TRATADOR GLOBAL DE ERROS
══════════════════════════════════════ */
aplicacao.use(tratadorErros);

module.exports = aplicacao;
