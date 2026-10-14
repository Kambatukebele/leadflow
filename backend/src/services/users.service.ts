import prisma from "../db/prisma";
import argon2 from "argon2";

export const createUserService = async (body) => {
  const passwordHashed = await argon2.hash(body.password);
  return await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      passwordHash: passwordHashed,
    },
    omit: {
      passwordHash: true,
    },
  });
};
