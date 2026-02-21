// app.js
import express from "express";
import router from "./routes/index.routes.js";

const app = express();
app.use(express.json());
app.use(router);

export default app; // Se faltar isso, o server.js não funciona.