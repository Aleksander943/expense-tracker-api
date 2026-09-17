import { Router } from "express";
import userRoutes from "./user.routes.js";
import { auth } from "../middlewares/auth.js";
import {
  createTransactionController,
  listTransactionsController,
} from "../controllers/transaction.controller.js";
import dashboard from "../controllers/dashboard.controller.js";
import { User } from "../controllers/auth.controller.js";

const router = Router();

function getDbDiagnostics() {
  const dbUrl = process.env.DATABASE_URL || "";
  let host = "not-configured";

  try {
    if (dbUrl) {
      host = new URL(dbUrl).hostname;
    }
  } catch {
    host = "invalid-url";
  }

  const maskedHost =
    host.startsWith("db.") && host.includes(".supabase.co")
      ? host.replace(/^db\.([^.]{4})[^.]*\./, "db.$1****.")
      : host;

  return {
    dbHost: maskedHost,
    usingDirectUrl: Boolean(process.env.DIRECT_URL),
    nodeEnv: process.env.NODE_ENV || "development",
  };
}

router.get("/", (req, res) => {
  res.json({ mensagem: "API Financeiro funcionando 🚀" });
});

router.get("/debug/db-target", (req, res) => {
  res.json(getDbDiagnostics());
});

router.get("/me", auth, User);

router.post("/transaction", auth, createTransactionController);

router.get("/transactions", auth, listTransactionsController);

// router.delete("/transaction/:id", auth, transactionController.delete);

// router.put("/transaction/:id", auth, transactionController.put);

router.get("/dashboard", auth, dashboard.dashboard);

router.use(userRoutes);

export default router;
