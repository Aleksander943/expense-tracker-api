import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

export const createUser = async ({ name, email, password }: CreateUser) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

export const loginUser = async ({ email, password }: LoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Usuário não existe!");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("E-mail ou senha inválidos");
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET não está configurado");
  }

  const token = jwt.sign({ id: user.id }, jwtSecret, {
    expiresIn: "1d",
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
