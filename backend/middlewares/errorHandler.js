/* ── Middleware de tratamento global de erros ── */
const tratadorDeErros = (erro, requisicao, resposta, proximo) => {
  let codigoStatus = erro.statusCode || 500;
  let mensagem     = erro.message    || "Erro interno do servidor";

  /* ── Erro de ID inválido do Mongoose ── */
  if (erro.name === "CastError") {
    codigoStatus = 400;
    mensagem     = "ID inválido";
  }

  /* ── Erro de campo duplicado (ex: email já cadastrado) ── */
  if (erro.code === 11000) {
    codigoStatus = 400;
    const campoDuplicado = Object.keys(erro.keyValue)[0];
    mensagem = `${campoDuplicado} já está em uso`;
  }

  /* ── Erro de validação do Mongoose ── */
  if (erro.name === "ValidationError") {
    codigoStatus = 400;
    mensagem = Object.values(erro.errors)
      .map((e) => e.message)
      .join(", ");
  }

  /* ── Erro de token JWT inválido ── */
  if (erro.name === "JsonWebTokenError") {
    codigoStatus = 401;
    mensagem     = "Token inválido";
  }

  /* ── Erro de token JWT expirado ── */
  if (erro.name === "TokenExpiredError") {
    codigoStatus = 401;
    mensagem     = "Token expirado. Faça login novamente.";
  }

  /* ── Log em desenvolvimento ── */
  if (process.env.NODE_ENV === "development") {
    console.error("❌ Erro:", erro);
  }

  resposta.status(codigoStatus).json({
    sucesso:  false,
    mensagem,
    /* ── Detalhes da pilha apenas em desenvolvimento ── */
    ...(process.env.NODE_ENV === "development" && { pilha: erro.stack }),
  });
};

module.exports = tratadorDeErros;
