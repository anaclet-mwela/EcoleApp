"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
export const getPayments = async (f) => {
  try {
    let whereClause = {};

    if (f && f !== "Tout") {
      whereClause = {
        Approuve: f === "true", // Convert string to boolean
      };
    }

    const payments = await prisma.paiement.findMany({
      include: { facture: true },
      where: whereClause,
    });

    return payments;
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while fetching payments." };
  }
};

export async function ajouterPaiement(paiementData) {
  try {
    // Validate input
    if (!paiementData.ID_Facture || !paiementData.Montant_Paye) {
      throw new Error("Missing required fields: ID_Facture or Montant_Paye");
    }

    // Fetch the related facture to check total payments
    const facture = await prisma.facture.findUnique({
      where: {
        ID_Facture: paiementData.ID_Facture,
      },
      include: {
        Paiement: true, // Include related Paiements to calculate the total paid amount
      },
    });

    if (!facture) {
      throw new Error("Facture not found");
    }

    // Calculate total payments including the new payment
    const totalPaiements =
      facture.Paiement.reduce(
        (sum, paiement) => sum + paiement.Montant_Paye,
        0
      ) + paiementData.Montant_Paye;

    if (totalPaiements > facture.Montant_Total) {
      throw new Error("Le montant entrée dépasse le montant à payer");
    }

    // Create new payment
    const newPaiement = await prisma.paiement.create({
      data: {
        ID_Facture: paiementData.ID_Facture,
        Montant_Paye: paiementData.Montant_Paye,
        Mode_Paiement: paiementData.Mode_Paiement || "cash", // Default to "cash" if not provided
        Date_Paiement: paiementData.Date_Paiement || new Date(),
        Approuve:
          paiementData.Approuve !== undefined ? paiementData.Approuve : false, // Default to false if not provided
      },
    });
    revalidatePath("/admin/payments");

    return {
      success: true,
      data: newPaiement,
    };
  } catch (error) {
    console.error("Error adding payment:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export const approuvePaiement = async (id) => {
  console.log(id);

  // Approve the payment
  const approvedPayment = await prisma.paiement.update({
    where: { ID_Paiement: id },
    data: {
      Approuve: true,
    },
  });

  // Fetch the facture associated with the approved payment
  const facture = await prisma.facture.findUnique({
    where: { ID_Facture: approvedPayment.ID_Facture },
    include: { Paiement: true },
  });

  if (facture) {
    // Calculate the total amount of approved payments
    const totalPaiements = facture.Paiement.reduce((sum, paiement) => {
      return paiement.Approuve ? sum + paiement.Montant_Paye : sum;
    }, 0);

    // Check if the total approved payments equal the facture's total amount
    if (totalPaiements >= facture.Montant_Total) {
      // Update the facture's status to "payé"
      await prisma.facture.update({
        where: { ID_Facture: facture.ID_Facture },
        data: { Statut: "payé" },
      });
    }
  }

  // Revalidate the path
  revalidatePath("/admin/payments");
};

export const deletePaiement = async (formData) => {
  const { id } = Object.fromEntries(formData);

  // Fetch the payment to get the associated facture ID before deleting it
  const payment = await prisma.paiement.findUnique({
    where: { ID_Paiement: id },
  });

  if (payment) {
    // Delete the payment
    await prisma.paiement.delete({
      where: { ID_Paiement: id },
    });

    // Fetch the associated facture
    const facture = await prisma.facture.findUnique({
      where: { ID_Facture: payment.ID_Facture },
      include: { Paiement: true },
    });

    if (facture) {
      // Calculate the total amount of approved payments for the facture
      const totalPaiements = facture.Paiement.reduce((sum, paiement) => {
        return paiement.Approuve ? sum + paiement.Montant_Paye : sum;
      }, 0);

      // If the total amount of approved payments is less than the facture's total amount, set the status to "Non payé"
      if (totalPaiements < facture.Montant_Total) {
        await prisma.facture.update({
          where: { ID_Facture: facture.ID_Facture },
          data: { Statut: "Non payé" },
        });
      }
    }
  }

  // Revalidate the path
  revalidatePath("/admin/payments");
};
