import type { Request, Response } from "express";
import { createUser, loginUser } from "../services/user.service.js";

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são necessários para criação." });
  }
  try {
    const createUse = await createUser({
      name,
      email,
      password,
    });
    return res.status(201).json(createUse);
  } catch (error) {
    return res.status(500).json({ error: "Erro na criação de usuário." });
  }
};

export const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res
      .status(400)
      .json({ message: "E-mail e senha são obrigatórios." });
  }

  try {
    const userLogin = await loginUser({
      email,
      password,
    });
    return res.status(200).json(userLogin);
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Usuário não existe!" ||
        error.message === "E-mail ou senha inválidos")
    ) {
      return res.status(401).json({
        error: "E-mail ou senha inválidos.",
      });
    }

    return res.status(500).json({
      error: "Erro ao fazer login.",
    });
  }
};
