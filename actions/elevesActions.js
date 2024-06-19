"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export const fetchEleves = async () => {
  try {
    const eleves = await prisma.eleve.findMany({
      include: {
        classe: true,
      },
    });
    return eleves;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};
export const getEleves = async (f, q, o) => {
  let sortOption = {};

  // Determine the sort option based on the 'f' parameter
  if (f === "Nom" && o === "asc") sortOption = { Nom: "asc" };
  if (f === "Nom" && o === "desc") sortOption = { Nom: "desc" };
  if (f === "Prenom" && o === "asc") sortOption = { Prenom: "asc" };
  if (f === "Prenom" && o === "desc") sortOption = { Prenom: "desc" };

  try {
    const eleves = await prisma.eleve.findMany({
      include: {
        classe: true,
      },
      where: {
        OR: [{ Nom: { startsWith: q } }, { Prenom: { startsWith: q } }],
      },
      orderBy: sortOption,
    });
    return eleves;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};

export const ajouterEleve = async (formData) => {
  const {
    Adresse,
    Adresse_Email,
    Date_Naissance,
    Nom,
    Sexe,
    Numero_Telephone,
    Parent_Tuteur,
    Prenom,
    ID_Classe,
  } = Object.fromEntries(formData);

  try {
    await prisma.eleve.create({
      data: {
        Adresse,
        Adresse_Email,
        Date_Naissance: new Date(Date_Naissance),
        Nom,
        Numero_Telephone,
        Parent_Tuteur,
        Prenom,
        classeId: ID_Classe,
        Sexe,
      },
    });
  } catch (error) {
    console.log(error);
    // throw new Error("Failed to add a tenant")
  }
  revalidatePath("/admin/eleves");
  redirect("/admin/eleves");
};

export const getEleve = async (id) => {
  try {
    const eleve = await prisma.eleve.findUnique({
      where: { ID_Eleve: id },
      include: { classe: true },
    });
    return eleve;
  } catch (error) {
    console.log(error);
  }
};

export const modifierEleve = async (formData, id) => {
  const {
    Adresse,
    Adresse_Email,
    Date_Naissance,
    Nom,
    Sexe,
    Numero_Telephone,
    Parent_Tuteur,
    Prenom,
    ID_Classe,
  } = Object.fromEntries(formData);

  try {
    await prisma.eleve.update({
      where: { ID_Eleve: id },
      data: {
        Adresse,
        Adresse_Email,
        Date_Naissance: new Date(Date_Naissance),
        Nom,
        Numero_Telephone,
        Parent_Tuteur,
        Prenom,
        classeId: ID_Classe,
        Sexe,
      },
    });

    revalidatePath("/admin/eleves");
    redirect("/admin/eleves");
  } catch (error) {
    console.error(error);
    // throw new Error("Failed to update student information");
  }
};

export const supprimerEleve = async (formData) => {
  const { id } = Object.fromEntries(formData);
  console.log(id);
  try {
    await prisma.eleve.delete({
      where: { ID_Eleve: id },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/eleves");
};
