import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { requireSessionId } from "../../../shared/helpers/require-session-id";
import type { TransactionService } from "../services/transaction-service";

const getTransactionParamsSchema = z.object({
  id: z.string().uuid(),
});

export function createGetTransactionByIdController(transactionService: TransactionService) {
  return async function getTransactionById(request: FastifyRequest, reply: FastifyReply) {
    const sessionId = requireSessionId(request, reply);

    if (!sessionId) {
      return;
    }

    const params = getTransactionParamsSchema.parse(request.params);

    const transaction = await transactionService.getById(params.id, sessionId);

    return { transaction };
  };
}
