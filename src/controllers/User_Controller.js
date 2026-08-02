import { GetUser } from "../services/User.js";

export const User = async (req, res) => {
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