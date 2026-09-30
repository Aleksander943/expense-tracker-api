import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(router);


export default app;