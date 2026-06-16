const Relato = require("../models/Relato");

/* ══════════════════════════════════════
   GET /api/relatos
   Lista todos os relatos (público)
══════════════════════════════════════ */
const listarRelatos = async (requisicao, resposta, proximo) => {
  try {
    const relatos = await Relato.find().sort({ createdAt: -1 });
    resposta.status(200).json(relatos);
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   POST /api/relatos
   Cria um novo relato (admin)
══════════════════════════════════════ */
const criarRelato = async (requisicao, resposta, proximo) => {
  try {
    const novoRelato = await Relato.create(requisicao.body);
    resposta.status(201).json({
      sucesso:  true,
      mensagem: "Relato criado com sucesso!",
      relato:   novoRelato,
    });
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   PUT /api/relatos/:id
   Atualiza um relato (admin)
══════════════════════════════════════ */
const atualizarRelato = async (requisicao, resposta, proximo) => {
  try {
    const relatoAtualizado = await Relato.findByIdAndUpdate(
      requisicao.params.id,
      requisicao.body,
      { new: true, runValidators: true }
    );
    if (!relatoAtualizado) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Relato não encontrado.",
      });
    }
    resposta.status(200).json({
      sucesso:  true,
      mensagem: "Relato atualizado com sucesso!",
      relato:   relatoAtualizado,
    });
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   DELETE /api/relatos/:id
   Remove um relato (admin)
══════════════════════════════════════ */
const deletarRelato = async (requisicao, resposta, proximo) => {
  try {
    const relato = await Relato.findByIdAndDelete(requisicao.params.id);
    if (!relato) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Relato não encontrado.",
      });
    }
    resposta.status(200).json({
      sucesso:  true,
      mensagem: "Relato removido com sucesso!",
    });
  } catch (erro) {
    proximo(erro);
  }
};

module.exports = { listarRelatos, criarRelato, atualizarRelato, deletarRelato };
