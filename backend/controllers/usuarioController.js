const Usuario = require("../models/Usuario");
const Animal  = require("../models/Animal");
const Projeto = require("../models/Projeto");

/* ══════════════════════════════════════
   GET /api/usuarios
   Lista todos os usuários (admin)
══════════════════════════════════════ */
const listarUsuarios = async (requisicao, resposta, proximo) => {
  try {
    const usuarios = await Usuario.find().sort({ createdAt: -1 });
    resposta.status(200).json(usuarios);
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   GET /api/usuarios/:id
   Busca usuário por ID (admin)
══════════════════════════════════════ */
const buscarUsuarioPorId = async (requisicao, resposta, proximo) => {
  try {
    const usuario = await Usuario.findById(requisicao.params.id);

    if (!usuario) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Usuário não encontrado.",
      });
    }

    resposta.status(200).json(usuario);
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   DELETE /api/usuarios/:id
   Remove um usuário (admin)
══════════════════════════════════════ */
const deletarUsuario = async (requisicao, resposta, proximo) => {
  try {
    /* ── Impede que o admin delete a si mesmo ── */
    if (requisicao.params.id === requisicao.usuario._id.toString()) {
      return resposta.status(400).json({
        sucesso:  false,
        mensagem: "Você não pode deletar sua própria conta.",
      });
    }

    const usuario = await Usuario.findByIdAndDelete(requisicao.params.id);

    if (!usuario) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Usuário não encontrado.",
      });
    }

    resposta.status(200).json({
      sucesso:  true,
      mensagem: "Usuário removido com sucesso!",
    });
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   GET /api/dashboard
   Resumo geral para o painel (admin)
══════════════════════════════════════ */
const buscarDashboard = async (requisicao, resposta, proximo) => {
  try {
    /* ── Executa todas as contagens em paralelo para maior performance ── */
    const [
      totalAnimais,
      animaisDisponiveis,
      animaisAdotados,
      totalProjetos,
      projetosAtivos,
      usuariosCadastrados,
    ] = await Promise.all([
      Animal.countDocuments(),
      Animal.countDocuments({ status: "disponivel" }),
      Animal.countDocuments({ status: "adotado" }),
      Projeto.countDocuments(),
      Projeto.countDocuments({ ativo: true }),
      Usuario.countDocuments(),
    ]);

    resposta.status(200).json({
      sucesso: true,
      totalAnimais,
      animaisDisponiveis,
      animaisAdotados,
      totalProjetos,
      projetosAtivos,
      usuariosCadastrados,
    });
  } catch (erro) {
    proximo(erro);
  }
};

module.exports = { listarUsuarios, buscarUsuarioPorId, deletarUsuario, buscarDashboard };
