import { FastifyInstance } from "fastify";

import { z } from "zod";
import { prisma } from "../database/prismaClient";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const transactions = await prisma.transactions.findMany();

    return {
      transactions,
    };
  });

  app.get("/summary", async () => {
    const summary = await prisma.transactions.aggregate({
      _sum: {
        amount: true,
      },
    });

    return { summary };
  });

  app.get("/:id", async (request, response) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const params = getTransactionParamsSchema.parse(request.params);

    const transaction = await prisma.transactions.findUnique({ where: { id: params.id } });

    return {
      transaction,
    };
  });

  app.post("/", async (request, response) => {
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const body = createTransactionSchema.parse(request.body);

    await prisma.transactions.create({
      data: {
        title: body.title,
        amount: body.type === "credit" ? body.amount : body.amount * -1,
      },
    });

    return response.send(201).send();
  });
}
