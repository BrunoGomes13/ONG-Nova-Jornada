# 🐾 ONG Nova Jornada Animal — Sistema Full Stack

Sistema web completo para gerenciamento de adoção de animais, desenvolvido com React.js no frontend e Node.js + Express + MongoDB Atlas no backend.

---

## 👨‍💻 Integrantes do Grupo

- Alan Bezerra Chagas
- Bruno Gomes de Albuquerque Costa
- Daniel Tavares de Almeida
- Ivys Oliveira Dantas

---

## 📌 Descrição da Aplicação

Plataforma web criada para otimizar o processo de adoção de animais e melhorar a gestão interna da ONG Nova Jornada Animal. O sistema conta com:

- Área pública: divulgação de animais, projetos, relatos e contato
- Painel administrativo completo com CRUD de animais, projetos e usuários
- Autenticação com JWT e controle de acesso por perfil (admin / cliente)
- API REST integrada com MongoDB Atlas

---

## 🚀 Tecnologias Utilizadas

### Frontend
- React.js 19
- JavaScript (ES6+)
- CSS3 com variáveis customizadas
- React Router DOM v6
- Fetch API para consumo do backend

### Backend
- Node.js
- Express.js
- MongoDB Atlas (banco em nuvem)
- Mongoose (ODM)
- JSON Web Token — JWT (autenticação)
- bcryptjs (hash de senhas)
- Helmet, CORS, Morgan (segurança e logs)
- express-validator (validações)

---

## 📂 Estrutura do Projeto

```
ONG-Nova-Jornada/               ← Pasta do frontend (já existente)
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Admin/
│   │       ├── Barra_Lateral/  (BarraLateral.js + .css)
│   │       ├── Cabecalho/      (Cabecalho.js + .css)
│   │       ├── CartaoDashboard/(CartaoDashboard.js + .css)
│   │       └── Layout/         (LayoutAdmin.js + .css)
│   ├── pages/
│   │   ├── [páginas públicas existentes]
│   │   └── Admin/
│   │       ├── Dashboard/
│   │       ├── Animais/
│   │       ├── Projetos/
│   │       ├── Usuarios/
│   │       ├── Relatos/
│   │       └── Contatos/
│   ├── routes/
│   │   ├── AdminRoute.js
│   │   └── AdminRoutes.js
│   ├── services/
│   │   └── adminApi.js
│   ├── App.js
│   └── index.js
├── .env
└── package.json

backend/                        ← Pasta do backend (nova)
├── config/
│   └── db.js                   (conexão MongoDB Atlas)
├── controllers/
│   ├── authController.js
│   ├── animalController.js
│   ├── projetoController.js
│   └── usuarioController.js
├── middlewares/
│   ├── authMiddleware.js       (verificação JWT)
│   ├── roleMiddleware.js       (controle por perfil)
│   └── errorHandler.js
├── models/
│   ├── Usuario.js
│   ├── Animal.js
│   └── Projeto.js
├── routes/
│   ├── authRoutes.js
│   ├── animalRoutes.js
│   ├── projetoRoutes.js
│   └── usuarioRoutes.js
├── src/
│   └── seed.js                 (popula banco com dados iniciais)
├── app.js
├── server.js
├── package.json
└── .env                        (criar a partir do .env.example)
```

---

## 🗄️ Modelagem do Banco de Dados

### Entidade: Usuario
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| nome | String | ✅ | Nome completo |
| email | String | ✅ | Único no sistema |
| senha | String | ✅ | Armazenada com hash bcrypt |
| role | String | — | "admin" ou "cliente" (padrão: cliente) |
| createdAt | Date | — | Gerado automaticamente |

### Entidade: Animal
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| nome | String | ✅ | Nome do animal |
| especie | String | ✅ | Ex: Cachorro, Gato |
| raca | String | — | Padrão: SRD |
| idade | Number | — | Idade em anos |
| sexo | String | — | Macho ou Fêmea |
| porte | String | — | Pequeno, Médio, Grande |
| descricao | String | — | Descrição livre |
| status | String | — | "disponivel" ou "adotado" |
| imagem | String | — | URL da imagem |

### Entidade: Projeto
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| titulo | String | ✅ | Título do projeto |
| descricao | String | — | Descrição longa |
| objetivo | String | — | Objetivo principal |
| imagem | String | — | URL da imagem |
| ativo | Boolean | — | Padrão: true |

### Relacionamentos
- Um **Usuario** com role "admin" pode gerenciar **Animais** e **Projetos**
- Um **Usuario** com role "cliente" pode visualizar **Animais** e **Projetos**
- **Animal** e **Projeto** são independentes entre si

---

## 🔗 Endpoints da API

Base URL: `http://localhost:5000/api`

### Autenticação (`/api/auth`)
| Método | Rota | Proteção | Descrição |
|--------|------|----------|-----------|
| POST | /auth/register | Pública | Cadastrar novo usuário |
| POST | /auth/login | Pública | Login — retorna token JWT |
| GET | /auth/me | JWT | Retorna dados do usuário logado |

### Animais (`/api/animais`)
| Método | Rota | Proteção | Descrição |
|--------|------|----------|-----------|
| GET | /animais | Pública | Listar todos os animais |
| GET | /animais/:id | Pública | Buscar animal por ID |
| POST | /animais | JWT + Admin | Criar novo animal |
| PUT | /animais/:id | JWT + Admin | Atualizar animal |
| DELETE | /animais/:id | JWT + Admin | Remover animal |

### Projetos (`/api/projetos`)
| Método | Rota | Proteção | Descrição |
|--------|------|----------|-----------|
| GET | /projetos | Pública | Listar todos os projetos |
| GET | /projetos/:id | Pública | Buscar projeto por ID |
| POST | /projetos | JWT + Admin | Criar novo projeto |
| PUT | /projetos/:id | JWT + Admin | Atualizar projeto |
| DELETE | /projetos/:id | JWT + Admin | Remover projeto |

### Usuários (`/api/usuarios`)
| Método | Rota | Proteção | Descrição |
|--------|------|----------|-----------|
| GET | /usuarios | JWT + Admin | Listar todos os usuários |
| GET | /usuarios/:id | JWT + Admin | Buscar usuário por ID |
| DELETE | /usuarios/:id | JWT + Admin | Remover usuário |

### Dashboard (`/api/dashboard`)
| Método | Rota | Proteção | Descrição |
|--------|------|----------|-----------|
| GET | /dashboard | JWT + Admin | Totais: animais, projetos, usuários |

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- Node.js 18+
- npm
- Conta no MongoDB Atlas (gratuita)

### 1. Configurar o MongoDB Atlas

1. Acesse [mongodb.com/atlas](https://www.mongodb.com/atlas) e crie uma conta
2. Crie um cluster gratuito (M0 Free)
3. Em **Database Access**: crie usuário e senha
4. Em **Network Access**: adicione `0.0.0.0/0` (liberar todos os IPs)
5. Em **Database → Connect → Drivers**: copie a connection string

### 2. Configurar e rodar o Backend

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Criar o arquivo .env (copiar do exemplo)
cp .env.example .env
# Abrir o .env e preencher MONGO_URI com sua string do Atlas

# Popular o banco com dados iniciais
node src/seed.js

# Iniciar o servidor em modo desenvolvimento
npm run dev
```

O servidor estará disponível em: `http://localhost:5000`

**Credenciais criadas pelo seed:**
- Admin: `admin@novajornada.com` / `admin123`
- Cliente: `cliente@teste.com` / `cliente123`

### 3. Configurar e rodar o Frontend

```bash
# Entrar na pasta do frontend
cd ONG-Nova-Jornada

# Instalar dependências
npm install

# Iniciar o React
npm start
```

O frontend estará disponível em: `http://localhost:3000`

### 4. Acessar o painel admin

1. Vá em `http://localhost:3000/login`
2. Use: `admin@novajornada.com` / `admin123`
3. Será redirecionado automaticamente para `/adm/dashboard`

---

## 🔑 Como funciona a autenticação JWT

1. O frontend envia email e senha para `POST /api/auth/login`
2. O backend valida e retorna um **token JWT** (válido por 7 dias)
3. O frontend salva o token no `localStorage`
4. Todas as requisições protegidas enviam `Authorization: Bearer <token>` no header
5. O backend valida o token em cada requisição e verifica o `role` do usuário

---

## 📮 Testando no Postman

1. Crie um **Environment** com variável `baseUrl = http://localhost:5000/api`
2. Faça `POST {{baseUrl}}/auth/login` com body JSON `{"email":"admin@novajornada.com","senha":"admin123"}`
3. Na aba **Tests** da requisição de login, cole:
```javascript
const res = pm.response.json();
if (res.token) pm.environment.set("token", res.token);
```
4. Em rotas protegidas, adicione header: `Authorization: Bearer {{token}}`

---

*Projeto desenvolvido para fins acadêmicos — ONG Nova Jornada Animal 🐾*
