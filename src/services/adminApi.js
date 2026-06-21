/* ── URL base da API (definir no .env como REACT_APP_API_URL) ── */
const URL_BASE_API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* ── Recupera o token JWT do localStorage ── */
const pegarToken = () => localStorage.getItem("token");

/* ── Monta os headers padrão com autorização ── */
const montarCabecalhos = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${pegarToken()}`,
});

/* ── Erro customizado: marca se foi falha de REDE (servidor fora do ar)
   ou um erro de NEGÓCIO (backend respondeu, mas com erro tipo "email já existe") ── */
class ErroApi extends Error {
  constructor(mensagem, ehFalhaDeRede = false) {
    super(mensagem);
    this.ehFalhaDeRede = ehFalhaDeRede;
  }
}

/* ── Faz a chamada fetch tratando os dois tipos de erro separadamente ── */
async function chamarApi(url, opcoes) {
  let resposta;
  try {
    resposta = await fetch(url, opcoes);
  } catch (erroDeRede) {
    /* ── fetch só cai aqui se o servidor estiver inacessível de verdade
       (backend desligado, CORS bloqueado, sem internet, etc) ── */
    throw new ErroApi("Não foi possível conectar ao servidor. Verifique se o backend está rodando.", true);
  }

  let dados;
  try {
    dados = await resposta.json();
  } catch {
    /* ── resposta chegou mas não é JSON válido ── */
    throw new ErroApi("O servidor respondeu de forma inesperada. Tente novamente.", true);
  }

  if (!resposta.ok) {
    /* ── erro de negócio: o backend respondeu certinho, só que com erro ── */
    throw new ErroApi(dados.mensagem || "Ocorreu um erro.", false);
  }

  return dados;
}

/* ══════════════════════════════════════
   AUTENTICAÇÃO
══════════════════════════════════════ */

export const login = async (email, senha) => {
  return chamarApi(`${URL_BASE_API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
};

export const registrar = async (nome, email, senha) => {
  return chamarApi(`${URL_BASE_API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });
};

export const buscarMeuPerfil = async () => {
  return chamarApi(`${URL_BASE_API}/auth/me`, {
    headers: montarCabecalhos(),
  });
};

/* ══════════════════════════════════════
   DASHBOARD
══════════════════════════════════════ */

export const getDashboard = async () => {
  return chamarApi(`${URL_BASE_API}/dashboard`, {
    headers: montarCabecalhos(),
  });
};

/* ══════════════════════════════════════
   ANIMAIS
══════════════════════════════════════ */

export const getAnimais = async () => {
  return chamarApi(`${URL_BASE_API}/animais`, {
    headers: montarCabecalhos(),
  });
};

export const getAnimalPorId = async (id) => {
  return chamarApi(`${URL_BASE_API}/animais/${id}`, {
    headers: montarCabecalhos(),
  });
};

export const criarAnimal = async (corpo) => {
  return chamarApi(`${URL_BASE_API}/animais`, {
    method: "POST",
    headers: montarCabecalhos(),
    body: JSON.stringify(corpo),
  });
};

export const atualizarAnimal = async (id, corpo) => {
  return chamarApi(`${URL_BASE_API}/animais/${id}`, {
    method: "PUT",
    headers: montarCabecalhos(),
    body: JSON.stringify(corpo),
  });
};

export const deletarAnimal = async (id) => {
  return chamarApi(`${URL_BASE_API}/animais/${id}`, {
    method: "DELETE",
    headers: montarCabecalhos(),
  });
};

/* ══════════════════════════════════════
   PROJETOS
══════════════════════════════════════ */

export const getProjetos = async () => {
  return chamarApi(`${URL_BASE_API}/projetos`, {
    headers: montarCabecalhos(),
  });
};

export const criarProjeto = async (corpo) => {
  return chamarApi(`${URL_BASE_API}/projetos`, {
    method: "POST",
    headers: montarCabecalhos(),
    body: JSON.stringify(corpo),
  });
};

export const atualizarProjeto = async (id, corpo) => {
  return chamarApi(`${URL_BASE_API}/projetos/${id}`, {
    method: "PUT",
    headers: montarCabecalhos(),
    body: JSON.stringify(corpo),
  });
};

export const deletarProjeto = async (id) => {
  return chamarApi(`${URL_BASE_API}/projetos/${id}`, {
    method: "DELETE",
    headers: montarCabecalhos(),
  });
};

/* ══════════════════════════════════════
   USUÁRIOS (apenas admin)
══════════════════════════════════════ */

export const getUsuarios = async () => {
  return chamarApi(`${URL_BASE_API}/usuarios`, {
    headers: montarCabecalhos(),
  });
};

export const deletarUsuario = async (id) => {
  return chamarApi(`${URL_BASE_API}/usuarios/${id}`, {
    method: "DELETE",
    headers: montarCabecalhos(),
  });
};

export { ErroApi };
