import type { Request, Response } from "express";
import { getUser } from "../services/auth.service.js";

export const getUserController = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await getUser(userId);

    if (user == null) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuario." });
  }
};
