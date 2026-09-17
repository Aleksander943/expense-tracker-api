import { Router } from "express";
import {
	createUserController,
	userLoginController,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/users", createUserController);
router.post("/login", userLoginController);

export default router;
