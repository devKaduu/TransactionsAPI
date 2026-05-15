import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { requireSessionId } from "../../../shared/helpers/require-session-id";
import type { TransactionService } from "../services/transaction-service";

const createTransactionSchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(["credit", "debit"]),
});

export function createCreateTransactionController(transactionService: TransactionService) {
  return async function createTransaction(request: FastifyRequest, reply: FastifyReply) {
    const body = createTransactionSchema.parse(request.body);

    const sessionId = requireSessionId(request, reply);

    if (!sessionId) {
      return;
    }

    await transactionService.create({
      title: body.title,
      amount: body.amount,
      type: body.type,
      sessionId,
    });

    return reply.status(201).send();
  };
}
