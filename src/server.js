
import "dotenv/config";
import app from "./app.js"; // O arquivo app.js está na mesma pasta?

const porta = process.env.PORT || 8080;

app.get("/teste-direto", (req, res) => {
  res.send("O servidor está vivo!");
});

app.listen(porta, "0.0.0.0", () => {
  console.log(`Servidor online na porta: ${porta}`);
});