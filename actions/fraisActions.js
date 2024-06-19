"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export const getFrais = async () => {
  try {
    const eleves = await prisma.frais.findMany({});
    return eleves;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};
