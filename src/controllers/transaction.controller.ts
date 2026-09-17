import type { Request, Response } from "express";
import { CreateTransaction, listTransactions } from "../services/transaction.service.js";


export const createTransactionController = async (
  req: Request,
  res: Response,
) => {
  const {description, value, type, transactionDate} = req.body;
  const userId = req.userId;

  try{
    const transaction = await CreateTransaction({
      userId,
      description,
      value: Number(value),
      type,
      transactionDate: new Date(transactionDate)
    })

    return res.status(201).json(transaction)
  }catch(error){
    return res.status(500).json({
      error: "Erro ao criar transação"
    })

  }

  
  // 3. Converter transactionDate para Date
  // 4. Validar os dados
  // 5. Chamar createTransaction(...)
  // 6. Retornar status 201
};


export const listTransactionsController = async (
  req: Request,
  res: Response,
) => {
  const userId = req.userId;
  
  try{
    const transactionList = await listTransactions(userId)
    return res.status(200).json(transactionList)
  }catch(error){
    return res.status(500).json({
      error: "Erro ao listar transações"
    })
  }
};

// export const updateTransactionController = async (
//   req: Request,
//   res: Response,
// ) => {
//   // 1. Converter req.params.id para number
//   // 2. Pegar e converter os dados do req.body
//   // 3. Chamar updateTransaction({...})
//   // 4. Verificar se result.count === 0
//   // 5. Retornar 404 ou 200
// };

// export const deleteTransactionController = async (
//   req: Request,
//   res: Response,
// ) => {
//   // 1. Converter req.params.id para number
//   // 2. Chamar deleteTransaction(id, req.userId)
//   // 3. Verificar se result.count === 0
//   // 4. Retornar 404 ou 204
// };