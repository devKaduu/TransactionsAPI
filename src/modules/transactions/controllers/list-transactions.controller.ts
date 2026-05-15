import type { FastifyReply, FastifyRequest } from "fastify";

import { requireSessionId } from "../../../shared/helpers/require-session-id";
import type { TransactionService } from "../services/transaction-service";

export function createListTransactionsController(transactionService: TransactionService) {
  return async function listTransactions(request: FastifyRequest, reply: FastifyReply) {
    const sessionId = requireSessionId(request, reply);

    if (!sessionId) {
      return;
    }

    const transactions = await transactionService.listBySessionId(sessionId);

    return { transactions };
  };
}
