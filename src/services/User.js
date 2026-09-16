import prisma from "../lib/prisma.js";

export const GetUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return user;
};