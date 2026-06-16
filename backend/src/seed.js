require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const Usuario  = require("./models/Usuario");
const Animal   = require("./models/Animal");
const Projeto  = require("./models/Projeto");

/* ── Script para popular o banco com dados iniciais ── */
const popularBancoDeDados = async () => {
  try {
    console.log("🔌 Conectando ao MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado!");

    /* ── Limpa as coleções antes de inserir ── */
    await Promise.all([
      Usuario.deleteMany({}),
      Animal.deleteMany({}),
      Projeto.deleteMany({}),
    ]);
    console.log("🗑️  Coleções limpas");

    /* ── Cria o administrador padrão ── */
    const senhaHash = await bcrypt.hash("admin123", 10);
    await Usuario.create({
      nome:  "Administrador",
      email: "admin@novajornada.com",
      senha: senhaHash,
      role:  "admin",
    });
    console.log("👑 Admin criado: admin@novajornada.com / admin123");

    /* ── Cria usuário cliente de teste ── */
    const senhaCliente = await bcrypt.hash("cliente123", 10);
    await Usuario.create({
      nome:  "Cliente Teste",
      email: "cliente@teste.com",
      senha: senhaCliente,
      role:  "cliente",
    });
    console.log("👤 Cliente criado: cliente@teste.com / cliente123");

    /* ── Cria animais de exemplo ── */
    await Animal.insertMany([
      { nome: "Thor",  especie: "Cachorro", raca: "SRD",    idade: 2, sexo: "Macho",  porte: "Médio",   status: "disponivel" },
      { nome: "Luna",  especie: "Gato",     raca: "Persa",  idade: 1, sexo: "Fêmea",  porte: "Pequeno", status: "disponivel" },
      { nome: "Max",   especie: "Cachorro", raca: "Labrador",idade:3, sexo: "Macho",  porte: "Grande",  status: "adotado"    },
      { nome: "Mia",   especie: "Gato",     raca: "SRD",    idade: 2, sexo: "Fêmea",  porte: "Pequeno", status: "disponivel" },
    ]);
    console.log("🐾 4 animais criados");

    /* ── Cria projetos de exemplo ── */
    await Projeto.insertMany([
      { titulo: "Castração Solidária", objetivo: "Reduzir a superpopulação animal", descricao: "Castração gratuita para animais de famílias carentes", ativo: true },
      { titulo: "Lar Temporário",      objetivo: "Acolher animais resgatados",       descricao: "Programa de famílias acolhedoras", ativo: true },
    ]);
    console.log("📁 2 projetos criados");

    console.log("\n✅ Banco de dados populado com sucesso!");
    console.log("══════════════════════════════════════");
    console.log("Login Admin:   admin@novajornada.com / admin123");
    console.log("Login Cliente: cliente@teste.com / cliente123");
    console.log("══════════════════════════════════════");

    process.exit(0);
  } catch (erro) {
    console.error("❌ Erro ao popular banco:", erro);
    process.exit(1);
  }
};

popularBancoDeDados();
