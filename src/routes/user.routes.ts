import { Router } from "express";
import {
	createUserController,
	loginUserController,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/users", createUserController);
router.post("/login", loginUserController);

export default router;
