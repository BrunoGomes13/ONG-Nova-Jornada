const Projeto = require("../models/Projeto");

/* ══════════════════════════════════════
   GET /api/projetos
   Lista todos os projetos (público)
══════════════════════════════════════ */
const listarProjetos = async (requisicao, resposta, proximo) => {
  try {
    const projetos = await Projeto.find().sort({ createdAt: -1 });
    resposta.status(200).json(projetos);
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   GET /api/projetos/:id
   Busca um projeto pelo ID (público)
══════════════════════════════════════ */
const buscarProjetoPorId = async (requisicao, resposta, proximo) => {
  try {
    const projeto = await Projeto.findById(requisicao.params.id);

    if (!projeto) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Projeto não encontrado.",
      });
    }

    resposta.status(200).json(projeto);
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   POST /api/projetos
   Cria um novo projeto (admin)
══════════════════════════════════════ */
const criarProjeto = async (requisicao, resposta, proximo) => {
  try {
    const novoProjeto = await Projeto.create(requisicao.body);

    resposta.status(201).json({
      sucesso:  true,
      mensagem: "Projeto criado com sucesso!",
      projeto:  novoProjeto,
    });
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   PUT /api/projetos/:id
   Atualiza um projeto (admin)
══════════════════════════════════════ */
const atualizarProjeto = async (requisicao, resposta, proximo) => {
  try {
    const projetoAtualizado = await Projeto.findByIdAndUpdate(
      requisicao.params.id,
      requisicao.body,
      { new: true, runValidators: true }
    );

    if (!projetoAtualizado) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Projeto não encontrado.",
      });
    }

    resposta.status(200).json({
      sucesso:  true,
      mensagem: "Projeto atualizado com sucesso!",
      projeto:  projetoAtualizado,
    });
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   DELETE /api/projetos/:id
   Remove um projeto (admin)
══════════════════════════════════════ */
const deletarProjeto = async (requisicao, resposta, proximo) => {
  try {
    const projeto = await Projeto.findByIdAndDelete(requisicao.params.id);

    if (!projeto) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Projeto não encontrado.",
      });
    }

    resposta.status(200).json({
      sucesso:  true,
      mensagem: "Projeto removido com sucesso!",
    });
  } catch (erro) {
    proximo(erro);
  }
};

module.exports = { listarProjetos, buscarProjetoPorId, criarProjeto, atualizarProjeto, deletarProjeto };
