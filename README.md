# 🐾 ONG Nova Jornada Animal

Sistema web completo para a ONG **Nova Jornada Animal**, desenvolvido com React no frontend e Node.js/Express no backend, com banco de dados MongoDB Atlas. A aplicação permite gerenciar animais disponíveis para adoção, projetos da ONG, relatos de adoção e mensagens de contato, além de oferecer um painel administrativo protegido por autenticação JWT.

---

## 👥 Integrantes do Grupo

| Nome |
|------|
| Alan Bezerra Chagas |
| Bruno Gomes de Albuquerque Costa |
| Daniel Tavares de Almeida |
| Ivys Oliveira Dantas |

---

## 📋 Descrição da Aplicação

A **Nova Jornada Animal** é uma plataforma web voltada à divulgação e gestão de uma ONG de proteção animal. O sistema é dividido em duas frentes:

- **Área pública**: permite que visitantes conheçam a ONG, visualizem animais disponíveis para adoção, acompanhem projetos e relatos de sucesso, além de enviar mensagens de contato.
- **Painel administrativo** (`/adm`): área restrita a usuários com perfil `admin`, onde é possível gerenciar animais, projetos, relatos, contatos recebidos, usuários cadastrados e visualizar métricas no dashboard.

---

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Node.js | — | Runtime JavaScript |
| Express | ^4.19.2 | Framework HTTP |
| Mongoose | ^8.5.1 | ODM para MongoDB |
| MongoDB Atlas | — | Banco de dados em nuvem |
| JSON Web Token (jsonwebtoken) | ^9.0.2 | Autenticação JWT |
| bcryptjs | ^2.4.3 | Hash de senhas |
| dotenv | ^16.4.5 | Variáveis de ambiente |
| cors | ^2.8.5 | Cross-Origin Resource Sharing |
| helmet | ^7.1.0 | Segurança HTTP |
| morgan | ^1.10.0 | Log de requisições |
| express-validator | ^7.2.0 | Validação de dados |
| nodemon | ^3.1.4 | Reinício automático (dev) |

### Frontend
| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | ^19.2.6 | Biblioteca de UI |
| React DOM | ^19.2.6 | Renderização |
| React Router DOM | ^6.30.3 | Roteamento SPA |
| react-scripts | 5.0.1 | Scripts CRA |
| lucide-react | ^1.16.0 | Ícones |

---

## 📁 Estrutura do Projeto

```
ONG-Nova-Jornada/
├── backend/                        # API REST (Node.js + Express)
│   ├── config/
│   │   └── db.js                   # Conexão com MongoDB Atlas
│   ├── controllers/
│   │   ├── animalController.js     # CRUD de animais
│   │   ├── authController.js       # Registro, login e perfil
│   │   ├── contatoController.js    # Gestão de mensagens de contato
│   │   ├── projetoController.js    # CRUD de projetos
│   │   ├── relatoController.js     # CRUD de relatos de adoção
│   │   └── usuarioController.js    # Gestão de usuários e dashboard
│   ├── middlewares/
│   │   ├── authMiddleware.js       # Verificação de token JWT
│   │   ├── errorHandler.js         # Tratamento global de erros
│   │   └── roleMiddleware.js       # Controle de permissão por role
│   ├── models/
│   │   ├── Animal.js               # Schema de Animal
│   │   ├── Contato.js              # Schema de Contato/Mensagem
│   │   ├── Projeto.js              # Schema de Projeto
│   │   ├── Relato.js               # Schema de Relato
│   │   └── Usuario.js              # Schema de Usuário
│   ├── routes/
│   │   ├── animalRoutes.js         # Rotas /api/animais
│   │   ├── authRoutes.js           # Rotas /api/auth
│   │   ├── contatoRoutes.js        # Rotas /api/contatos
│   │   ├── projetoRoutes.js        # Rotas /api/projetos
│   │   ├── relatoRoutes.js         # Rotas /api/relatos
│   │   └── usuarioRoutes.js        # Rotas /api/usuarios e /api/dashboard
│   ├── src/
│   │   └── seed.js                 # Script de população do banco
│   ├── app.js                      # Configuração do Express
│   ├── server.js                   # Inicialização do servidor
│   └── package.json
│
├── public/                         # Arquivos estáticos (CRA)
│   └── index.html
│
├── src/                            # Frontend React
│   ├── assets/
│   │   ├── animals/                # Imagens dos animais
│   │   └── projects/               # Imagens dos projetos
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── Barra_Lateral/      # Sidebar do painel admin
│   │   │   ├── Cabecalho/          # Cabeçalho do painel admin
│   │   │   ├── CartaoDashboard/    # Cards de métricas do dashboard
│   │   │   └── Layout/             # Layout do painel admin
│   │   ├── Footer/                 # Rodapé público
│   │   ├── Header/                 # Cabeçalho público
│   │   ├── LayoutPublico/          # Layout das páginas públicas
│   │   ├── Login/                  # Página/formulário de login
│   │   ├── cardAnimals/            # Card e detalhe de animal
│   │   ├── cardInformation/        # Card informativo
│   │   ├── cardProjects/           # Card de projeto
│   │   └── cardRelatos/            # Card de relato de adoção
│   ├── data/
│   │   └── animais.json            # Dados locais de animais (estáticos)
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── Animais/            # Gestão de animais (admin)
│   │   │   ├── Contatos/           # Gestão de contatos (admin)
│   │   │   ├── Dashboard/          # Dashboard (admin)
│   │   │   ├── Projetos/           # Gestão de projetos (admin)
│   │   │   ├── Relatos/            # Gestão de relatos (admin)
│   │   │   └── Usuarios/           # Gestão de usuários (admin)
│   │   ├── Animais/                # Listagem pública de animais
│   │   ├── Contato/                # Formulário de contato público
│   │   ├── Projetos/               # Página pública de projetos
│   │   ├── QuemSomos/              # Página sobre a ONG
│   │   ├── Relatos/                # Página pública de relatos
│   │   └── home/                   # Página inicial
│   ├── routes/
│   │   ├── AdminRoute.js           # Guarda de rota para admins
│   │   └── AppRoutes.js            # Configuração de todas as rotas
│   ├── services/
│   │   └── adminApi.js             # Serviços de comunicação com a API
│   ├── App.js
│   └── index.js
│
└── package.json                    # Dependências do frontend
```

---

## 🔌 Endpoints da API

A API base roda em `http://localhost:5000`. Todas as rotas partem de `/api`.

> 🔓 **Público** — acessível sem autenticação  
> 🔒 **Privado** — requer token JWT (`Authorization: Bearer <token>`) com role `admin`

---

### 🔐 Autenticação — `/api/auth`

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| `POST` | `/api/auth/register` | 🔓 Público | Registra um novo usuário |
| `POST` | `/api/auth/login` | 🔓 Público | Realiza login e retorna JWT |
| `GET` | `/api/auth/me` | 🔒 Privado | Retorna o perfil do usuário autenticado |

---

### 🐾 Animais — `/api/animais`

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| `GET` | `/api/animais` | 🔓 Público | Lista todos os animais |
| `GET` | `/api/animais/:id` | 🔓 Público | Busca um animal por ID |
| `POST` | `/api/animais` | 🔒 Admin | Cadastra um novo animal |
| `PUT` | `/api/animais/:id` | 🔒 Admin | Atualiza os dados de um animal |
| `DELETE` | `/api/animais/:id` | 🔒 Admin | Remove um animal |

---

### 🗂️ Projetos — `/api/projetos`

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| `GET` | `/api/projetos` | 🔓 Público | Lista todos os projetos |
| `GET` | `/api/projetos/:id` | 🔓 Público | Busca um projeto por ID |
| `POST` | `/api/projetos` | 🔒 Admin | Cria um novo projeto |
| `PUT` | `/api/projetos/:id` | 🔒 Admin | Atualiza um projeto |
| `DELETE` | `/api/projetos/:id` | 🔒 Admin | Remove um projeto |

---

### 💬 Relatos — `/api/relatos`

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| `GET` | `/api/relatos` | 🔓 Público | Lista todos os relatos de adoção |
| `POST` | `/api/relatos` | 🔒 Admin | Cria um novo relato |
| `PUT` | `/api/relatos/:id` | 🔒 Admin | Atualiza um relato |
| `DELETE` | `/api/relatos/:id` | 🔒 Admin | Remove um relato |

---

### 📩 Contatos — `/api/contatos`

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| `POST` | `/api/contatos` | 🔓 Público | Envia uma mensagem de contato |
| `GET` | `/api/contatos` | 🔒 Admin | Lista todas as mensagens recebidas |
| `PUT` | `/api/contatos/:id/lido` | 🔒 Admin | Marca uma mensagem como lida |
| `DELETE` | `/api/contatos/:id` | 🔒 Admin | Remove uma mensagem |

---

### 👤 Usuários — `/api/usuarios`

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| `GET` | `/api/usuarios` | 🔒 Admin | Lista todos os usuários cadastrados |
| `GET` | `/api/usuarios/:id` | 🔒 Admin | Busca um usuário por ID |
| `DELETE` | `/api/usuarios/:id` | 🔒 Admin | Remove um usuário |

---

### 📊 Dashboard — `/api/dashboard`

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| `GET` | `/api/dashboard` | 🔒 Admin | Retorna métricas gerais (total de animais, usuários, projetos, relatos e contatos) |

---

## 🗄️ Modelagem do Banco de Dados

O banco de dados utilizado é o **MongoDB Atlas** (NoSQL), gerenciado via **Mongoose**. As coleções e seus campos são:

---

### 📦 Coleção `animals`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `nome` | String | ✅ | Nome do animal |
| `especie` | String | ✅ | Espécie (ex.: Cão, Gato) |
| `raca` | String | ❌ | Raça (padrão: `"SRD"`) |
| `idade` | Number | ❌ | Idade em anos |
| `sexo` | String (enum) | ❌ | `"Macho"` \| `"Fêmea"` |
| `porte` | String (enum) | ❌ | `"Pequeno"` \| `"Médio"` \| `"Grande"` |
| `descricao` | String | ❌ | Descrição do animal |
| `status` | String (enum) | ❌ | `"disponivel"` \| `"adotado"` (padrão: `"disponivel"`) |
| `imagem` | String | ❌ | URL da imagem |
| `createdAt` / `updatedAt` | Date | — | Gerados automaticamente |

---

### 📦 Coleção `usuarios`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `nome` | String | ✅ | Nome do usuário |
| `email` | String | ✅ | E-mail único (lowercase) |
| `senha` | String | ✅ | Senha com hash bcrypt (mín. 6 caracteres) |
| `role` | String (enum) | ❌ | `"cliente"` \| `"admin"` (padrão: `"cliente"`) |
| `createdAt` / `updatedAt` | Date | — | Gerados automaticamente |

---

### 📦 Coleção `relatos`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `nome` | String | ✅ | Nome do adotante |
| `animal` | String | ✅ | Nome do animal adotado |
| `relato` | String | ✅ | Texto do relato |
| `imagem` | String | ❌ | URL da imagem (padrão: `""`) |
| `createdAt` / `updatedAt` | Date | — | Gerados automaticamente |

---

### 📦 Coleção `projetos`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `titulo` | String | ✅ | Título do projeto |
| `descricao` | String | ❌ | Descrição geral |
| `objetivo` | String | ❌ | Objetivo do projeto |
| `imagem` | String | ❌ | URL da imagem |
| `ativo` | Boolean | ❌ | Se o projeto está ativo (padrão: `true`) |
| `createdAt` / `updatedAt` | Date | — | Gerados automaticamente |

---

### 📦 Coleção `contatos`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `nome` | String | ✅ | Nome do remetente |
| `email` | String | ✅ | E-mail do remetente |
| `mensagem` | String | ✅ | Conteúdo da mensagem |
| `tipo` | String (enum) | ❌ | `"geral"` \| `"adocao"` (padrão: `"geral"`) |
| `animalNome` | String | ❌ | Nome do animal (quando tipo é `"adocao"`) |
| `animalId` | ObjectId (ref: Animal) | ❌ | Referência ao animal de interesse |
| `lido` | Boolean | ❌ | Se foi lido pelo admin (padrão: `false`) |
| `createdAt` / `updatedAt` | Date | — | Gerados automaticamente |

---

## ▶️ Instruções para Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas) com cluster configurado
- Gerenciador de pacotes `npm`

---

### 🔧 Backend

**1. Acesse a pasta do backend:**

```bash
cd backend
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Crie o arquivo `.env` na raiz de `backend/` com as seguintes variáveis:**

```env
MONGO_URI=sua_string_de_conexao_mongodb_atlas
JWT_SECRET=sua_chave_secreta_jwt
PORTA=5000
NODE_ENV=development
URL_FRONTEND=http://localhost:3000
```

**4. (Opcional) Popule o banco com dados iniciais:**

```bash
npm run seed
```

**5. Inicie o servidor:**

```bash
npm start
```

> O servidor estará disponível em `http://localhost:5000`.  
> Para desenvolvimento com reinício automático, use `npm run dev`.

---

### 🖥️ Frontend

**1. Acesse a raiz do projeto (onde está o `package.json` do React):**

```bash
cd ..
# ou, se estiver na raiz do projeto:
# já está no lugar certo
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Inicie a aplicação:**

```bash
npm start
```

> O frontend estará disponível em `http://localhost:3000`.

---

### 🔑 Acesso ao Painel Administrativo

Após criar um usuário com `role: "admin"` (via seed ou diretamente no banco), acesse:

```
http://localhost:3000/login
```

Após o login, a aplicação redirecionará automaticamente para o painel em `/adm/dashboard`.
