import type { FastifyInstance } from "fastify";

import { checkSessionIdExists } from "../../../shared/middlewares/check-session-id-exists";
import { createSessionId } from "../../../shared/middlewares/create-session-id";
import { createCreateTransactionController } from "../controllers/create-transaction.controller";
import { createGetTransactionByIdController } from "../controllers/get-transaction-by-id.controller";
import { createGetTransactionSummaryController } from "../controllers/get-transaction-summary.controller";
import { createListTransactionsController } from "../controllers/list-transactions.controller";
import type { TransactionService } from "../services/transaction-service";

export interface TransactionRoutesOptions {
  transactionService: TransactionService;
}

export async function transactionsRoutes(app: FastifyInstance, opts: TransactionRoutesOptions) {
  const { transactionService } = opts;

  const listTransactions = createListTransactionsController(transactionService);
  const getTransactionSummary = createGetTransactionSummaryController(transactionService);
  const getTransactionById = createGetTransactionByIdController(transactionService);
  const createTransaction = createCreateTransactionController(transactionService);

  app.get("/", { preHandler: [checkSessionIdExists] }, listTransactions);
  app.get("/summary", { preHandler: [checkSessionIdExists] }, getTransactionSummary);
  app.get("/:id", { preHandler: [checkSessionIdExists] }, getTransactionById);
  app.post("/", { preHandler: [createSessionId] }, createTransaction);
}
