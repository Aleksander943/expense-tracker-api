import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

export const CreateUser = async ({ name, email, password }: CreateUserInput) => {
  
  const existingUser= await prisma.user.findUnique({
    where:{ 
      email: email.toLowerCase().trim()
    }
  })
  
  if(existingUser !== null){
    throw new Error("Este e-mail já está cadastrado")
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const createUser = prisma.user.create({
    data: {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  
  return createUser
};

export const loginUser = async ({ email, password }: LoginUserInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase().trim(),
    },
  });

  if (!user) {
    throw new Error("E-mail ou senha inválidos");
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
