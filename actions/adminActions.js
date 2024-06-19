"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export const getAdmins = async () => {
  try {
    const admins = await prisma.administrateur.findMany({});
    return admin;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};
export const deleteAdmin = async (id) => {
  try {
    const admin = await prisma.administrateur.delete({
        where: {ID_Administrateur: id}
    });
    return admin;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};

