/* ── URL base da API (definir no .env como REACT_APP_API_URL) ── */
const URL_BASE_API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* ── Recupera o token JWT do localStorage ── */
const pegarToken = () => localStorage.getItem("token");

/* ── Monta os headers padrão com autorização ── */
const montarCabecalhos = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${pegarToken()}`,
});

/* ══════════════════════════════════════
   AUTENTICAÇÃO
══════════════════════════════════════ */

export const login = async (email, senha) => {
  const resposta = await fetch(`${URL_BASE_API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao fazer login");
  return dados;
};

export const registrar = async (nome, email, senha) => {
  const resposta = await fetch(`${URL_BASE_API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao registrar");
  return dados;
};

export const buscarMeuPerfil = async () => {
  const resposta = await fetch(`${URL_BASE_API}/auth/me`, {
    headers: montarCabecalhos(),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao buscar perfil");
  return dados;
};

/* ══════════════════════════════════════
   DASHBOARD
══════════════════════════════════════ */

export const getDashboard = async () => {
  const resposta = await fetch(`${URL_BASE_API}/dashboard`, {
    headers: montarCabecalhos(),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao buscar dashboard");
  return dados;
};

/* ══════════════════════════════════════
   ANIMAIS
══════════════════════════════════════ */

export const getAnimais = async () => {
  const resposta = await fetch(`${URL_BASE_API}/animais`, {
    headers: montarCabecalhos(),
  });
  return resposta.json();
};

export const getAnimalPorId = async (id) => {
  const resposta = await fetch(`${URL_BASE_API}/animais/${id}`, {
    headers: montarCabecalhos(),
  });
  return resposta.json();
};

export const criarAnimal = async (corpo) => {
  const resposta = await fetch(`${URL_BASE_API}/animais`, {
    method: "POST",
    headers: montarCabecalhos(),
    body: JSON.stringify(corpo),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao criar animal");
  return dados;
};

export const atualizarAnimal = async (id, corpo) => {
  const resposta = await fetch(`${URL_BASE_API}/animais/${id}`, {
    method: "PUT",
    headers: montarCabecalhos(),
    body: JSON.stringify(corpo),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao atualizar animal");
  return dados;
};

export const deletarAnimal = async (id) => {
  const resposta = await fetch(`${URL_BASE_API}/animais/${id}`, {
    method: "DELETE",
    headers: montarCabecalhos(),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao deletar animal");
  return dados;
};

/* ══════════════════════════════════════
   PROJETOS
══════════════════════════════════════ */

export const getProjetos = async () => {
  const resposta = await fetch(`${URL_BASE_API}/projetos`, {
    headers: montarCabecalhos(),
  });
  return resposta.json();
};

export const criarProjeto = async (corpo) => {
  const resposta = await fetch(`${URL_BASE_API}/projetos`, {
    method: "POST",
    headers: montarCabecalhos(),
    body: JSON.stringify(corpo),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao criar projeto");
  return dados;
};

export const atualizarProjeto = async (id, corpo) => {
  const resposta = await fetch(`${URL_BASE_API}/projetos/${id}`, {
    method: "PUT",
    headers: montarCabecalhos(),
    body: JSON.stringify(corpo),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao atualizar projeto");
  return dados;
};

export const deletarProjeto = async (id) => {
  const resposta = await fetch(`${URL_BASE_API}/projetos/${id}`, {
    method: "DELETE",
    headers: montarCabecalhos(),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao deletar projeto");
  return dados;
};

/* ══════════════════════════════════════
   USUÁRIOS (apenas admin)
══════════════════════════════════════ */

export const getUsuarios = async () => {
  const resposta = await fetch(`${URL_BASE_API}/usuarios`, {
    headers: montarCabecalhos(),
  });
  return resposta.json();
};

export const deletarUsuario = async (id) => {
  const resposta = await fetch(`${URL_BASE_API}/usuarios/${id}`, {
    method: "DELETE",
    headers: montarCabecalhos(),
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao deletar usuário");
  return dados;
};
