import { FastifyInstance } from "fastify";

import { z } from "zod";
import { prisma } from "../database/prismaClient";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

import { TransactionRepository } from "../repositories/transaction-repository";
import { createSessionId } from "../middlewares/create-session-id";

const transactionRepository = new TransactionRepository(prisma);

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies;

    const transactions = await prisma.transactions.findMany({
      where: {
        sessionId: sessionId,
      },
    });

    return {
      transactions,
    };
  });

  app.get("/summary", { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies;

    const summary = await prisma.transactions.aggregate({
      where: {
        sessionId: sessionId,
      },
      _sum: {
        amount: true,
      },
    });

    return { summary };
  });

  app.get("/:id", { preHandler: [checkSessionIdExists] }, async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { sessionId } = request.cookies;

    const params = getTransactionParamsSchema.parse(request.params);

    const transaction = await prisma.transactions.findUnique({
      where: {
        id: params.id,
        sessionId: sessionId,
      },
    });

    return {
      transaction,
    };
  });

  app.post("/", { preHandler: [createSessionId] }, async (request, response) => {
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const body = createTransactionSchema.parse(request.body);

    await transactionRepository.createTransaction({
      title: body.title,
      amount: body.type === "credit" ? body.amount : body.amount * -1,
      sessionId: request.cookies.sessionId,
    });

    return response.send(201).send();
  });
}
