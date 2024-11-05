import { FastifyInstance } from "fastify";

import { z } from "zod";
import { prisma } from "../database/prismaClient";
import { randomUUID } from "crypto";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", { preHandler: [checkSessionIdExists] }, async (request, response) => {
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

  app.get("/:id", { preHandler: [checkSessionIdExists] }, async (request, response) => {
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

  app.post("/", async (request, response) => {
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const body = createTransactionSchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      response.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    await prisma.transactions.create({
      data: {
        title: body.title,
        amount: body.type === "credit" ? body.amount : body.amount * -1,
        sessionId: sessionId,
      },
    });

    return response.send(201).send();
  });
}
