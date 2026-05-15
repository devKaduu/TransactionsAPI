import { PrismaClient } from "@prisma/client";
import { CreateTransactionDto } from "../dto/create-transaction-dto";

export class TransactionRepository {
  constructor(private prisma: PrismaClient) {}

  async createTransaction(transaction: CreateTransactionDto) {
    return this.prisma.transactions.create({
      data: transaction,
    });
  }

  async listBySessionId(sessionId: string) {
    return this.prisma.transactions.findMany({
      where: { sessionId },
    });
  }

  async findById(id: string, sessionId: string) {
    return this.prisma.transactions.findFirst({
      where: { id, sessionId },
    });
  }

  async getSummaryBySessionId(sessionId: string) {
    return this.prisma.transactions.aggregate({
      where: { sessionId },
      _sum: { amount: true },
    });
  }
}
