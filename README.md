# 💸 API de Transações Financeiras

Este é um projeto backend construído com foco em escalabilidade, boas práticas e modularidade. A aplicação permite o controle de transações financeiras, onde cada usuário pode registrar movimentações (crédito/débito) e consultar o histórico da sua conta.

---

## 🧠 Tecnologias e Conceitos Utilizados

- **Node.js** + **Fastify** – servidor HTTP performático
- **TypeScript** – segurança e produtividade com tipagem estática
- **Prisma ORM** – acesso ao banco de dados com clareza e segurança
- **SOLID Principles** – design de código limpo e modular
- **Injeção de Dependência** – desacoplamento entre camadas
- **DTOs, Repositories, Use Cases e Controllers** – separação clara de responsabilidades
- **Arquitetura Modular por Features** – código organizado por domínio de negócio

---

## ✅ Requisitos Funcionais (RF)

- O usuário deve poder **criar uma nova transação**
- O usuário deve poder **obter um resumo da sua conta**
- O usuário deve poder **listar todas as transações**
- O usuário deve poder **visualizar uma transação única**

---

## 📌 Regras de Negócio (RN)

- A transação pode ser do tipo **crédito** (soma ao saldo) ou **débito** (subtrai do saldo)
- Deve ser possível **identificar o usuário entre as requisições**
- O usuário só pode **visualizar transações que ele mesmo criou**

## 🚀 Como Rodar o Projeto

```bash
# Instale as dependências
npm install

# Gere o client do Prisma
npx prisma generate

# Rode as migrations (se aplicável)
npx prisma migrate dev

# Inicie o servidor
npm run dev
```
