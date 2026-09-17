import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET não está configurado");
}

const userController = {
  async create(
    req: Request<Record<string, never>, unknown, CreateUserBody>,
    res: Response,
  ) {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        error: "Nome, e-mail e senha são obrigatórios",
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);

      return res.status(400).json({
        error: "Não foi possível cadastrar o usuário",
      });
    }
  },

  async login(
    req: Request<Record<string, never>, unknown, LoginBody>,
    res: Response,
  ) {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        error: "E-mail e senha são obrigatórios",
      });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email.trim().toLowerCase(),
        },
      });

      if (!user) {
        return res.status(401).json({
          error: "E-mail ou senha inválidos",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          error: "E-mail ou senha inválidos",
        });
      }

      const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        message: "Login realizado com sucesso",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);

      return res.status(500).json({
        error: "Erro interno",
      });
    }
  },
};

export default userController;