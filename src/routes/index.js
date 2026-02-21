import express from "express";
import indexRoutes from "./index.routes.js";

const router = express.Router();

router.use("/", indexRoutes);

export default router;
