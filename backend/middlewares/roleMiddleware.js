/* ── Verifica se o usuário possui o perfil (role) necessário ── */
const verificarPermissao = (...perfisPermitidos) => {
  return (requisicao, resposta, proximo) => {
    /* ── Verifica se o role do usuário está na lista de permitidos ── */
    if (!perfisPermitidos.includes(requisicao.usuario.role)) {
      return resposta.status(403).json({
        sucesso:  false,
        mensagem: `Acesso negado. Apenas ${perfisPermitidos.join(", ")} pode acessar este recurso.`,
      });
    }
    proximo();
  };
};

module.exports = verificarPermissao;
