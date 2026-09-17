import prisma from "../lib/prisma.js";

interface CreateTransactionInput {
  userId: number;
  description: string;
  transactionDate: Date;
  value: number;
  type: "receita" | "despesa";
}

interface UpdateTransaction extends CreateTransactionInput {
  id: number;
}

export const CreateTransaction = async ({
  userId,
  description,
  transactionDate,
  value,
  type,
}: CreateTransactionInput) => {
  return prisma.transaction.create({
    data: {
      userId,
      description,
      transactionDate,
      value,
      type,
    },
  });
};

export const listTransactions = async (userId: number) => {
  return prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: [{ transactionDate: "desc" }, { createdAt: "desc" }],
  });
};

export const updateTransaction = async ({
  id,
  userId,
  description,
  transactionDate,
  value,
  type,
}: UpdateTransaction) => {
  return prisma.transaction.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      description,
      transactionDate,
      value,
      type,
    },
  });
};

export const deleteTransaction = async (id: number, userId: number) => {
  return prisma.transaction.deleteMany({
    where: {
      userId,
      id,
    },
  });
};
