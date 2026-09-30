import type { Request, Response } from "express";
import { GetUser } from "../services/auth.service.js";

export const User = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const userGet = await GetUser(userId);

    if (userGet == null) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.status(200).json(userGet);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuario." });
  }
};
