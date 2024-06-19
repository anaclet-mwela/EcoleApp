"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export const fetchClasses = async (f, q, o) => {
  let sortOption = {};

  // Determine the sort option based on the 'f' parameter
  if (f === "Nom" && o === "asc") sortOption = { Nom_Classe: "asc" };
  if (f === "Nom" && o === "desc") sortOption = { Nom_Classe: "desc" };
  if (f === "Niveau" && o === "asc") sortOption = { Niveau: "asc" };
  if (f === "Niveau" && o === "desc") sortOption = { Niveau: "desc" };
  if (f === "Filière" && o === "asc") sortOption = { Filiere: "asc" };
  if (f === "Filière" && o === "desc") sortOption = { Filiere: "desc" };

  try {
    const classes = await prisma.classe.findMany({
      where: {
        OR: [
          { Nom_Classe: { startsWith: q } },
          { Niveau: { startsWith: q } },
          { Filiere: { startsWith: q } },
        ],
      },
      orderBy: sortOption,
    });
    return classes;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};

export const ajouterClasse = async (formData) => {
  const {
    ID_Classe,
    Nom_Classe,
    Niveau,
    Filiere,
    Professeur_Principal,
    anneeId,
  } = Object.fromEntries(formData);

  try {
    await prisma.classe.create({
      data: {
        ID_Classe,
        Nom_Classe,
        Niveau,
        Filiere,
        Professeur_Principal,
        anneeId,
      },
    });
  } catch (error) {
    console.log(error);
    // throw new Error("Failed to add a tenant")
  }
  revalidatePath("/admin/classes");
  redirect("/admin/classes");
};




export const supprimerClasse = async (formData) => {
  const { id } = Object.fromEntries(formData);
  console.log(id);
  try {
    // First, delete all students associated with the class
    await prisma.eleve.deleteMany({
      where: { classeId: id },
    });
    // Then, delete the class
    await prisma.classe.delete({
      where: { ID_Classe: id },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/classes");
};