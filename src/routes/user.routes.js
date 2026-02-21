import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/users", userController.create);
router.post("/login", userController.login);

export default router;
