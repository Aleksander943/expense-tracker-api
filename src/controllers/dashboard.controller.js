import prisma from "../lib/prisma.js";

const dashboard = {
  async dashboard(req, res) {
    try {
      const userId = Number(req.userId);
      const transactions = await prisma.transaction.findMany({
        where: { userId },
      });

      const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.value, 0);

      const outcome = transactions
        .filter((t) => t.type === "outcome")
        .reduce((sum, t) => sum + t.value, 0);

      return res.json({
        income,
        outcome,
        balance: income - outcome,
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao carregar dashboard" });
    }
  },
};

export default dashboard;