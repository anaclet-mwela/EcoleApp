"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export const getFactures = async (q, f) => {
  try {
    let whereClause = {
      OR: [
        {
          eleve: {
            OR: [
              {
                Nom: { startsWith: q },
              },
              {
                Prenom: { startsWith: q },
              },
            ],
          },
        },
      ],
    };

    if (f !== "Tout") {
      whereClause.Statut = f;
    }

    const factures = await prisma.facture.findMany({
      include: {
        eleve: true,
      },
      where: whereClause,
    });
    return factures;
  } catch (error) {
    console.error(error);
    return { message: "error occurred" };
  }
};

export const getAllFactures = async () => {
  try {
    const factures = await prisma.facture.findMany({
      include: {
        eleve: true,
      },
    });
    return factures;
  } catch (error) {
    console.log(error);
  }
};

export const ajouterFacture = async (factureData) => {
  console.log(factureData);
  const { ID_Eleve, Montant_Total, FraisIds, Numero_Facture } = factureData;
  try {
    const createdFacture = await prisma.facture.create({
      data: {
        ID_Eleve,
        Montant_Total,
        FraisIds,
        Numero_Facture,
      },
    });
    revalidatePath("/admin/factures");
    redirect("/admin/factures");

    // Handle post-save actions, like clearing the form or redirecting the user
  } catch (error) {
    console.error("Error saving facture:", error);
  }
};

export const supprimerFacture = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    // Delete all associated payments first
    await prisma.paiement.deleteMany({
      where: { ID_Facture: id },
    });

    // Then delete the facture
    await prisma.facture.delete({
      where: { ID_Facture: id },
    });
  } catch (error) {
    console.log(error);
  }

  // Revalidate the path
  revalidatePath("/admin/factures");
};

export const getFactureById = async (id) => {
  try {
    const facture = await prisma.facture.findUnique({
      where: {
        ID_Facture: id,
      },
      include: {
        eleve: true,
        Paiement: true,
      },
    });

    return facture;
  } catch (error) {
    console.log(error.message);
  }
};
