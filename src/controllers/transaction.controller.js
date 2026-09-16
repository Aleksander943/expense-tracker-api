import prisma from "../lib/prisma.js";

const transactionController = {
  async transaction(req, res) {
    const { value, description, type, transactionDate } = req.body;
    const userId = req.userId;

    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          description,
          value: Number(value),
          type,
          userId: Number(userId),
          transactionDate: new Date(transactionDate),
        },
      });
      return res.status(200).json(newTransaction);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar transação" });
    }
  },

  async index(req, res) {
    const userId = req.userId;
    const transaction = await prisma.transaction.findMany({
      where: { userId: Number(userId) },
      orderBy: [{ transactionDate: "desc" }, { createdAt: "desc" }],
    });
    return res.json(transaction);
  },

  async delete(req, res) {
    const { id } = req.params;
    const userId = req.userId;
    try {
      await prisma.transaction.deleteMany({
        where: {
          id: Number(id),
          userId: Number(userId),
        },
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar transação" });
    }
  },

  async put(req, res) {
    const { id } = req.params;
    const userId = req.userId;
    const { description, value, type, createdAt } = req.body;
    try {
      const result = await prisma.transaction.updateMany({
        where: {
          id: Number(id),
          userId: Number(userId),
        },
        data: {
          description,
          value: Number(value),
          type,
          createdAt: createdAt ? new Date(createdAt) : undefined,
        },
      });

      if (result.count === 0) {
        return res.status(404).json({ error: "Transação não encontrada" });
      }

      return res.status(200).json({ mensagem: " Atualizado com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao editar transação" });
    }
  },
};

export default transactionController;
