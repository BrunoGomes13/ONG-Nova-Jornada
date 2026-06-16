const jwt     = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

/* ── Verifica se o token JWT é válido e carrega o usuário ── */
const verificarAutenticacao = async (requisicao, resposta, proximo) => {
  let token;

  /* ── Extrai o token do header Authorization ── */
  const cabecalhoAutorizacao = requisicao.headers.authorization;

  if (cabecalhoAutorizacao && cabecalhoAutorizacao.startsWith("Bearer ")) {
    token = cabecalhoAutorizacao.split(" ")[1];
  }

  /* ── Se não houver token, nega o acesso ── */
  if (!token) {
    return resposta.status(401).json({
      sucesso:  false,
      mensagem: "Acesso negado. Token não fornecido.",
    });
  }

  try {
    /* ── Decodifica e valida o token ── */
    const dadosDecodificados = jwt.verify(token, process.env.JWT_SEGREDO);

    /* ── Busca o usuário no banco (sem retornar a senha) ── */
    const usuarioEncontrado = await Usuario.findById(dadosDecodificados.id);

    if (!usuarioEncontrado) {
      return resposta.status(401).json({
        sucesso:  false,
        mensagem: "Usuário do token não encontrado.",
      });
    }

    /* ── Disponibiliza o usuário na requisição ── */
    requisicao.usuario = usuarioEncontrado;
    proximo();
  } catch (erro) {
    return resposta.status(401).json({
      sucesso:  false,
      mensagem: "Token inválido ou expirado.",
    });
  }
};

module.exports = verificarAutenticacao;
