import cookie from "@fastify/cookie";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { transactionsRoutes } from "./modules/transactions/routes/transactions.routes";

import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

import { prisma } from "./database/prismaClient";
import { TransactionRepository } from "./modules/transactions/repositories/transaction-repository";
import { TransactionService } from "./modules/transactions/services/transaction-service";

export const app = fastify();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Documentation
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Transactions API",
      version: "0.0.1",
      description: "API for managing transactions",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(cookie);

// Injeção de dependências: composition root
const transactionRepository = new TransactionRepository(prisma);
const transactionService = new TransactionService(transactionRepository);

app.register(transactionsRoutes, {
  prefix: "transactions",
  transactionService,
});
