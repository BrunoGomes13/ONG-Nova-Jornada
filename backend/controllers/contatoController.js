const Contato = require("../models/Contato");

/* ══════════════════════════════════════
   POST /api/contatos
   Cria uma nova mensagem de contato (público)
   Usado tanto pelo formulário de Contato quanto
   pelo formulário de interesse em adoção.
══════════════════════════════════════ */
const criarContato = async (requisicao, resposta, proximo) => {
  try {
    const { nome, email, mensagem, tipo, animalNome, animalId } = requisicao.body;

    const novoContato = await Contato.create({
      nome,
      email,
      mensagem,
      tipo:       tipo || "geral",
      animalNome: animalNome || "",
      animalId:   animalId || undefined,
    });

    resposta.status(201).json({
      sucesso:  true,
      mensagem: "Mensagem enviada com sucesso! Em breve entraremos em contato.",
      contato:  novoContato,
    });
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   GET /api/contatos
   Lista todas as mensagens (admin)
══════════════════════════════════════ */
const listarContatos = async (requisicao, resposta, proximo) => {
  try {
    const contatos = await Contato.find().sort({ createdAt: -1 });
    resposta.status(200).json(contatos);
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   PUT /api/contatos/:id/lido
   Marca uma mensagem como lida (admin)
══════════════════════════════════════ */
const marcarComoLido = async (requisicao, resposta, proximo) => {
  try {
    const contato = await Contato.findByIdAndUpdate(
      requisicao.params.id,
      { lido: true },
      { new: true }
    );

    if (!contato) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Mensagem não encontrada.",
      });
    }

    resposta.status(200).json({ sucesso: true, contato });
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   DELETE /api/contatos/:id
   Remove uma mensagem (admin)
══════════════════════════════════════ */
const deletarContato = async (requisicao, resposta, proximo) => {
  try {
    const contato = await Contato.findByIdAndDelete(requisicao.params.id);

    if (!contato) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Mensagem não encontrada.",
      });
    }

    resposta.status(200).json({
      sucesso:  true,
      mensagem: "Mensagem removida com sucesso!",
    });
  } catch (erro) {
    proximo(erro);
  }
};

module.exports = { criarContato, listarContatos, marcarComoLido, deletarContato };
