import type { FastifyReply, FastifyRequest } from "fastify";

import { requireSessionId } from "../../../shared/helpers/require-session-id";
import type { TransactionService } from "../services/transaction-service";

export function createGetTransactionSummaryController(transactionService: TransactionService) {
  return async function getTransactionSummary(request: FastifyRequest, reply: FastifyReply) {
    const sessionId = requireSessionId(request, reply);

    if (!sessionId) {
      return;
    }

    const summary = await transactionService.getSummaryBySessionId(sessionId);

    return { summary };
  };
}
