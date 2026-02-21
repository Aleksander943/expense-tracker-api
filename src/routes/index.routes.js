import { Router } from "express";
import userRoutes from "./user.routes.js";
import { auth } from "../middlewares/auth.js";
import transactionController from "../controllers/transaction.controller.js"

const router = Router();

router.get("/", (req, res) => {
  res.json({ mensagem: "API Financeiro funcionando 🚀" });
});

router.get("/me", auth, (req, res) => {
  res.json({
    mensagem: "Rota protegida, usuário autenticado!",
    seuId: req.userId
  });
})

router.post("/transaction", auth, transactionController.transaction);

router.get("/transactions", auth, transactionController.index);

router.use(userRoutes);

export default router;
