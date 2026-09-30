import { Router } from "express";
import userRoutes from "./user.routes.js";
import { auth } from "../middlewares/auth.js";
import {
  createTransactionController,
  deleteTransactionController,
  listTransactionsController,
  updateTransactionController,
} from "../controllers/transaction.controller.js";
import { getUserController } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ mensagem: "Servidor rodando" });
});

router.get("/me", auth, getUserController);

router.post("/transaction", auth, createTransactionController);

router.get("/transactions", auth, listTransactionsController);

router.delete("/transaction/:id", auth, deleteTransactionController);

router.put("/transaction/:id", auth, updateTransactionController);

router.use(userRoutes);

export default router;
