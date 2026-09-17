import { GetUser } from "../services/user.service.js";
import type { Request, Response } from "express";

export const User = async (req: Request, res: Response) => {
  try {
    const user = await GetUser(req.userId);

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);

    return res.status(500).json({
      mensagem: "Erro ao buscar usuário",
    });
  }
};