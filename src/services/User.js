import prisma from "../lib/prisma.js"

export const GetUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where:{
      id: Number(userId),
    },
  });

  return user;
}