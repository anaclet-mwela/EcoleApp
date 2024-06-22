"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export const fetchAnnees = async () => {
  try {
    const annees = await prisma.annee.findMany({});
    return annees;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};

export const ajouterAnnee = async (formData) => {
  const { Annee_Debut, Annee_Fin } = Object.fromEntries(formData);
  try {
    const frais = await prisma.annee.create({
      data: {
        Annee_Debut: new Date(Annee_Debut),
        Annee_Fin: new Date(Annee_Fin),
      },
    });
    revalidatePath("/admin/annees");
    redirect("/admin/annees");
    return frais;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};

export const supprimerAnnee = async (formData) => {
  const { ID_Annee } = Object.fromEntries(formData);
  try {
    const annee = await prisma.annee.delete({
      where: { ID_Annee },
    });
    revalidatePath("/admin/annees");
    redirect("/admin/annees");
    return annee;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};