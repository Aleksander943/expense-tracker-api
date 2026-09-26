# Expense Tracker API

API REST para gerenciamento de receitas e despesas pessoais. O projeto oferece cadastro de usuários, autenticação com JWT e operações completas para controle de transações financeiras.

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JSON Web Token (JWT)
- bcryptjs

## Funcionalidades

- Cadastro e autenticação de usuários
- Geração de token JWT
- Consulta do usuário autenticado
- Cadastro de receitas e despesas
- Listagem de transações por usuário
- Atualização e exclusão de transações
- Proteção das rotas privadas

## Estrutura do projeto

```text
expense-tracker-api/
├── prisma/                 # Schema e migrações do banco de dados
├── scripts/                # Scripts auxiliares
├── src/
│   ├── controllers/        # Entrada das requisições HTTP
│   ├── lib/                # Configuração do Prisma
│   ├── middlewares/        # Middleware de autenticação
│   ├── routes/             # Rotas da API
│   ├── services/           # Regras de negócio e acesso aos dados
│   ├── type/               # Tipagens adicionais do Express
│   ├── app.ts              # Configuração da aplicação Express
│   └── server.ts           # Inicialização do servidor
├── .env.example
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Como executar localmente

### Pré-requisitos

- Node.js
- PostgreSQL local ou em nuvem

### Instalação

```bash
git clone https://github.com/Aleksander943/expense-tracker-api.git
cd expense-tracker-api
npm install
```

Crie um arquivo `.env` com base no `.env.example`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/expense_tracker"
JWT_SECRET="uma_chave_secreta_segura"
PORT=8080
```

Prepare o banco de dados e inicie o servidor:

```bash
npx prisma migrate dev
npx prisma generate
npm run dev
```

A API ficará disponível por padrão em `http://localhost:8080`.

## Rotas da API

| Método | Rota | Autenticação | Descrição |
| --- | --- | --- | --- |
| `GET` | `/` | Não | Verifica se a API está funcionando |
| `POST` | `/users` | Não | Cadastra um usuário |
| `POST` | `/login` | Não | Autentica o usuário e retorna um token |
| `GET` | `/me` | Sim | Retorna o usuário autenticado |
| `POST` | `/transaction` | Sim | Cadastra uma transação |
| `GET` | `/transactions` | Sim | Lista as transações do usuário |
| `PUT` | `/transaction/:id` | Sim | Atualiza uma transação |
| `DELETE` | `/transaction/:id` | Sim | Exclui uma transação |

Nas rotas privadas, envie o token no cabeçalho:

```http
Authorization: Bearer SEU_TOKEN
```

### Exemplo de transação

```json
{
  "description": "Salário",
  "value": 2500,
  "type": "receita",
  "transactionDate": "2026-09-26"
}
```

O campo `type` aceita os valores `receita` e `despesa`.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Executa a API em desenvolvimento |
| `npm run build` | Compila o TypeScript para a pasta `dist` |
| `npm start` | Executa a versão compilada |
| `npm run e2e:register` | Executa o teste de cadastro |

## Autor

Desenvolvido por [Aleksander943](https://github.com/Aleksander943).
