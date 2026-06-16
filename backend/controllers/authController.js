const jwt     = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

/* ── Gera um token JWT para o usuário ── */
const gerarToken = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.JWT_SEGREDO,
    { expiresIn: process.env.JWT_EXPIRACAO || "7d" }
  );
};

/* ══════════════════════════════════════
   POST /api/auth/register
   Cadastra um novo usuário
══════════════════════════════════════ */
const registrar = async (requisicao, resposta, proximo) => {
  try {
    const { nome, email, senha, role } = requisicao.body;

    /* ── Verifica se email já existe ── */
    const emailJaCadastrado = await Usuario.findOne({ email });
    if (emailJaCadastrado) {
      return resposta.status(400).json({
        sucesso:  false,
        mensagem: "Este email já está cadastrado.",
      });
    }

    /* ── Cria o novo usuário (senha é hasheada no Model via pre-save) ── */
    const novoUsuario = await Usuario.create({ nome, email, senha, role: role || "cliente" });

    /* ── Gera token JWT ── */
    const tokenJWT = gerarToken(novoUsuario._id, novoUsuario.email, novoUsuario.role);

    resposta.status(201).json({
      sucesso: true,
      mensagem: "Usuário cadastrado com sucesso!",
      token: tokenJWT,
      usuario: {
        id:    novoUsuario._id,
        nome:  novoUsuario.nome,
        email: novoUsuario.email,
        role:  novoUsuario.role,
      },
    });
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   POST /api/auth/login
   Autentica e retorna o token JWT
══════════════════════════════════════ */
const login = async (requisicao, resposta, proximo) => {
  try {
    const { email, senha } = requisicao.body;

    /* ── Validação básica ── */
    if (!email || !senha) {
      return resposta.status(400).json({
        sucesso:  false,
        mensagem: "Email e senha são obrigatórios.",
      });
    }

    /* ── Busca usuário incluindo a senha (que é select: false no Schema) ── */
    const usuarioEncontrado = await Usuario.findOne({ email }).select("+senha");

    if (!usuarioEncontrado) {
      return resposta.status(401).json({
        sucesso:  false,
        mensagem: "Credenciais inválidas.",
      });
    }

    /* ── Verifica se a senha está correta ── */
    const senhaCorreta = await usuarioEncontrado.verificarSenha(senha);
    if (!senhaCorreta) {
      return resposta.status(401).json({
        sucesso:  false,
        mensagem: "Credenciais inválidas.",
      });
    }

    /* ── Gera token JWT ── */
    const tokenJWT = gerarToken(
      usuarioEncontrado._id,
      usuarioEncontrado.email,
      usuarioEncontrado.role
    );

    resposta.status(200).json({
      sucesso: true,
      mensagem: "Login realizado com sucesso!",
      token: tokenJWT,
      usuario: {
        id:    usuarioEncontrado._id,
        nome:  usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
        role:  usuarioEncontrado.role,
      },
    });
  } catch (erro) {
    proximo(erro);
  }
};

/* ══════════════════════════════════════
   GET /api/auth/me
   Retorna o usuário autenticado
══════════════════════════════════════ */
const buscarMeuPerfil = async (requisicao, resposta, proximo) => {
  try {
    const usuario = await Usuario.findById(requisicao.usuario._id);

    resposta.status(200).json({
      sucesso: true,
      usuario: {
        id:        usuario._id,
        nome:      usuario.nome,
        email:     usuario.email,
        role:      usuario.role,
        criadoEm: usuario.createdAt,
      },
    });
  } catch (erro) {
    proximo(erro);
  }
};

module.exports = { registrar, login, buscarMeuPerfil };
