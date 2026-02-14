const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mensagem: "API Financeiro funcionando 🚀" });
});

module.exports = router;