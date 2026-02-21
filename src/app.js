import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*", // Permite qualquer origem (ideal para desenvolvimento)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(router);


export default app; // Se faltar isso, o server.js não funciona.