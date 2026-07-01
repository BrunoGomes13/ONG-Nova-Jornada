const Animal = require("../models/Animal");

/* 
   GET /api/animais
   Lista todos os animais (público)
*/
const listarAnimais = async (requisicao, resposta, proximo) => {
  try {
    const { status, especie } = requisicao.query;

    /* ── Filtro dinâmico por status e espécie ── */
    const filtro = {};
    if (status)  filtro.status  = status;
    if (especie) filtro.especie = especie;

    const animais = await Animal.find(filtro).sort({ createdAt: -1 });

    resposta.status(200).json(animais);
  } catch (erro) {
    proximo(erro);
  }
};

/* 
   GET /api/animais/:id
   Busca um animal pelo ID (público)
*/
const buscarAnimalPorId = async (requisicao, resposta, proximo) => {
  try {
    const animal = await Animal.findById(requisicao.params.id);

    if (!animal) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Animal não encontrado.",
      });
    }

    resposta.status(200).json(animal);
  } catch (erro) {
    proximo(erro);
  }
};

/* 
   POST /api/animais
   Cadastra um novo animal (admin)
*/
const criarAnimal = async (requisicao, resposta, proximo) => {
  try {
    const novoAnimal = await Animal.create(requisicao.body);

    resposta.status(201).json({
      sucesso:  true,
      mensagem: "Animal cadastrado com sucesso!",
      animal:   novoAnimal,
    });
  } catch (erro) {
    proximo(erro);
  }
};

/*
   PUT /api/animais/:id
   Atualiza um animal (admin)
*/
const atualizarAnimal = async (requisicao, resposta, proximo) => {
  try {
    const animalAtualizado = await Animal.findByIdAndUpdate(
      requisicao.params.id,
      requisicao.body,
      { new: true, runValidators: true }
    );

    if (!animalAtualizado) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Animal não encontrado.",
      });
    }

    resposta.status(200).json({
      sucesso:  true,
      mensagem: "Animal atualizado com sucesso!",
      animal:   animalAtualizado,
    });
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   DELETE /api/animais/:id
   Remove um animal (admin)
══════════════════════════════════════ */
const deletarAnimal = async (requisicao, resposta, proximo) => {
  try {
    const animal = await Animal.findByIdAndDelete(requisicao.params.id);

    if (!animal) {
      return resposta.status(404).json({
        sucesso:  false,
        mensagem: "Animal não encontrado.",
      });
    }

    resposta.status(200).json({
      sucesso:  true,
      mensagem: "Animal removido com sucesso!",
    });
  } catch (erro) {
    proximo(erro);
  }
};

module.exports = { listarAnimais, buscarAnimalPorId, criarAnimal, atualizarAnimal, deletarAnimal };
