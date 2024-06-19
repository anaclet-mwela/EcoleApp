"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export const fetchAnnees = async () => {
  try {
    const annees = await prisma.annee.findMany({});
    return annees;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};
