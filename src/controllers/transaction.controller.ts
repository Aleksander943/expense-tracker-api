import type { Request, Response } from "express";
import {
  CreateTransaction,
  deleteTransaction,
  listTransactions,
  updateTransaction,
} from "../services/transaction.service.js";

export const createTransactionController = async (
  req: Request,
  res: Response,
) => {
  const { description, value, type, transactionDate } = req.body;
  const userId = req.userId;

  try {
    const transaction = await CreateTransaction({
      userId,
      description,
      value: Number(value),
      type,
      transactionDate: new Date(transactionDate),
    });

    return res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao criar transação",
    });
  }
};

export const listTransactionsController = async (
  req: Request,
  res: Response,
) => {
  const userId = req.userId;

  try {
    const transactionList = await listTransactions(userId);
    return res.status(200).json(transactionList);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao listar transações",
    });
  }
};

export const updateTransactionController = async (
  req: Request,
  res: Response,
) => {
  const userId = req.userId;

  const transactionId: number = Number(req.params.id);
  const { description, value, type, transactionDate } = req.body;

  const convertedValue = Number(value);
  const convertedTransactionDate = new Date(transactionDate);
  try {
    const transactionUpdate = await updateTransaction({
      userId,
      id: transactionId,
      description,
      value: convertedValue,
      type,
      transactionDate: convertedTransactionDate,
    });

    if (transactionUpdate.count === 0) {
      return res.status(404).json({ error: "Transação não identificada" });
    }

    return res.status(200).json({ mensagem: "Transação atualizada com sucesso." });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar a transação." });
  }
};

export const deleteTransactionController = async (
  req: Request,
  res: Response,
) => {
  const userId = req.userId;
  const id = Number(req.params.id);

  try {
    const transactionDelete = await deleteTransaction(id, userId);
    if (transactionDelete.count === 0) {
      return res.status(404).json({ error: "Transação não identificada." });
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar transação." });
  }
};
