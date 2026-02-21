import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // O token vem como "Bearer <token>", então dividimos a string
  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Salva o ID do usuário na requisição para uso futuro
    return next(); // Libera para o próximo passo
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};