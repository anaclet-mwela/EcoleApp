"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export const getFrais = async () => {
  try {
    const frais = await prisma.frais.findMany({});
    return frais;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};
export const supprimerFrais = async (formData) => {
  const { ID_Frais } = Object.fromEntries(formData);
  try {
    const frais = await prisma.frais.delete({
      where: {ID_Frais}
    });
    revalidatePath("/admin/frais");
    redirect("/admin/frais");
    return frais;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};

export const ajouterFrais = async (formData) => {
  const { Description, Montant } = Object.fromEntries(formData);
  try {
    const frais = await prisma.frais.create({
      data: {
        Description,
        Montant: parseFloat(Montant),
      },
    });
    revalidatePath("/admin/frais");
    redirect('/admin/frais')
    return frais;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};
