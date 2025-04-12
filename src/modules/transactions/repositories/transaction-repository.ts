import { PrismaClient } from "@prisma/client";
import { CreateTransactionDto } from "../dto/create-transaction-dto";

export class TransactionRepository {
  constructor(private prisma: PrismaClient) {}

  async createTransaction(transaction: CreateTransactionDto) {
    return this.prisma.transactions.create({
      data: transaction,
    });
  }
}
