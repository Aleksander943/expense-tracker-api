import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userController = {
  async create(req, res) {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    const { email, password, name } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({ error: "E-mail ou senha inválidos" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "E-mail ou senha inválidos" });
      }
      const token = jwt.sign(
        { id: user.id }, // Payload
        process.env.JWT_SECRET, // O segredo vindo do seu arquivo .env
        { expiresIn: "1d" }, // Opções
      );

      // 2. Enviar o token na resposta
      return res.status(200).json({
        message: "Login realizado com sucesso",
        token, // O frontend vai guardar isso
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (e) {
      return res.status(500).json({ error: "Erro interno" });
    }
  },
};

export default userController;
