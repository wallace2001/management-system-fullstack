
# 🧩 Management System – Monorepo Fullstack

Sistema completo para gerenciamento de produtos, pedidos e usuários, utilizando **Next.js no frontend** e **NestJS no backend**, com autenticação, testes, documentação e Docker.

---

![NestJS](https://img.shields.io/badge/NestJS-red?logo=nestjs&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs)
![PostgreSQL](https://img.shields.io/badge/Postgres-316192?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/Tests-Jest-15c213?logo=jest)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)

---

## 📁 Estrutura do Projeto

```
/
├── backend/          # NestJS + Prisma + PostgreSQL + Swagger
├── frontend/         # Next.js + Tailwind + ShadCN + NextAuth
├── docker-compose.yml
└── README.md
```

---

## 📦 Tecnologias

- **Frontend:** Next.js, TailwindCSS, ShadCN UI, TanStack Query, NextAuth, Jest
- **Backend:** NestJS, Prisma ORM, PostgreSQL, JWT, Swagger, Jest
- **Infra:** Docker, Docker Compose

---

## 🚀 Executar Localmente

### 1. Clone o projeto

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Configure os arquivos `.env`

#### 🟣 `backend/.env`

```env
DATABASE_URL=postgresql://myuser:mypassword@db:5432/management
JWT_SECRET=my-secret
```

#### ⚫ `frontend/.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_SECRET=algum-secret
```

---

## 🐳 Rodar com Docker

```bash
docker-compose up --build
```

| Serviço       | URL                          |
|---------------|------------------------------|
| Frontend      | http://localhost:3001        |
| Backend (API) | http://localhost:3000        |
| Swagger       | http://localhost:3000/api    |
| PgAdmin       | http://localhost:8080        |

> PgAdmin:
> Login: `admin@admin.com`
> Senha: `admin`

---

## 📊 API (Backend)

### Comandos úteis

```bash
yarn install         # Instala dependências
yarn start:dev       # Modo desenvolvimento
yarn build           # Compila a aplicação
yarn start:prod      # Produção
yarn prisma generate # Gera cliente Prisma
yarn prisma db push  # Sincroniza esquema com o banco
yarn test            # Roda os testes
```

### Autenticação

- JWT via Bearer Token
- Após login, use o `access_token` no Swagger via botão **"Authorize"**

#### Criar usuário

```http
POST /auth/register
{
  "username": "admin",
  "password": "123456",
  "role": "ADMIN"
}
```

#### Obter token

```http
POST /auth/login
{
  "username": "admin",
  "password": "123456"
}
```

---

## 🌐 Frontend (Next.js)

### Comandos

```bash
yarn install   # Instala dependências
yarn dev       # Inicia ambiente de desenvolvimento
yarn build     # Gera build para produção
yarn start     # Inicia aplicação
yarn test      # Roda os testes
```

### Funcionalidades

- Interface moderna com ShadCN UI
- Autenticação com NextAuth (Credentials Provider)
- Proteção de rotas baseada em roles
- CRUD de produtos e pedidos
- Testes com Jest + React Testing Library

---

## ✅ Proteção de Rotas

| Rota          | Método | Autenticado | Permissões     |
|---------------|--------|-------------|----------------|
| `/products`   | GET    | ✅          | ADMIN, USER    |
| `/products`   | POST   | ✅          | ADMIN          |
| `/orders`     | POST   | ✅          | USER           |
| `/users`      | GET    | ✅          | ADMIN          |

---

## 📄 Documentação da API

Disponível via Swagger:

```
http://localhost:3000/api
```

---

## 🔐 SOLID aplicado no Backend

- **S**: Serviços com responsabilidades únicas (ex: `ProductsService`)
- **O**: Repositórios substituíveis por injeção
- **L**: Interfaces respeitam contratos
- **I**: Guards e services focados em funções específicas
- **D**: NestJS usa DI por padrão

---

## 🧪 Testes

- Backend e frontend testados com Jest
- Frontend possui testes de:
  - Renderização de componentes
  - Validações de formulários
  - Integrações com React Hook Form
  - Snapshot de layout

---

## 🔄 CI/CD Automatizado

Esse repositório possui **pipelines automatizadas com GitHub Actions** para:

- 🔎 **Rodar testes no frontend e backend** a cada `push` ou `pull request` na branch `master`
- 🛠️ **Build de produção** automatizado para ambos os projetos
- 🐘 Banco de dados PostgreSQL com Docker para os testes e2e

Os pipelines validam a aplicação antes de qualquer deploy.

---

## 🐞 Problemas Comuns

### ❌ Prisma: `Can't reach database at db:5432`

- Certifique-se de que o container do `db` está pronto
- Use `depends_on` e `healthcheck` no `docker-compose.yml`

### ❌ `.next` ou `dist` não encontrado

- Verifique se `yarn build` foi executado no Dockerfile
- O caminho no `CMD` precisa bater com a estrutura gerada

---

## 🎯 Deploy

- Frontend: Vercel / Netlify
- Backend: Render / Railway / Fly.io / VPS
- Banco: Supabase, NeonDB ou RDS

---

## 🤝 Contribua

Sinta-se à vontade para abrir PRs, issues ou sugestões.
Esse projeto é uma base sólida para sistemas administrativos em produção.

---

**Feito com 💙 por Wallace.**
