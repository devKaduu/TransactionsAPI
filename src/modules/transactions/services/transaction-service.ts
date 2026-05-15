import { TransactionRepository } from "../repositories/transaction-repository";

type CreateTransactionInput = {
  title: string;
  amount: number;
  type: "credit" | "debit";
  sessionId: string;
};

export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async create({ title, amount, type, sessionId }: CreateTransactionInput) {
    const normalizedAmount = type === "credit" ? amount : amount * -1;

    return this.transactionRepository.createTransaction({
      title,
      amount: normalizedAmount,
      sessionId,
    });
  }

  async listBySessionId(sessionId: string) {
    return this.transactionRepository.listBySessionId(sessionId);
  }

  async getById(id: string, sessionId: string) {
    return this.transactionRepository.findById(id, sessionId);
  }

  async getSummaryBySessionId(sessionId: string) {
    return this.transactionRepository.getSummaryBySessionId(sessionId);
  }
}
