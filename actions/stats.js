"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export const studentCount = async () => {
  try {
    const count = await prisma.eleve.count({});
    return count;
  } catch (err) {
    throw new Error("Une erreure s'est produite");
  }
};
export const boysCount = async () => {
  try {
    const count = await prisma.eleve.count({
      where: { Sexe: "M" },
    });
    return count;
  } catch (err) {
    throw new Error("Une erreure s'est produite");
  }
};
export const girlsCount = async () => {
  try {
    const count = await prisma.eleve.count({
      where: { Sexe: "F" },
    });
    return count;
  } catch (err) {
    throw new Error("Une erreure s'est produite");
  }
};

export const classtCount = async () => {
  try {
    const count = await prisma.classe.count({});
    return count;
  } catch (err) {
    throw new Error("Une erreure s'est produite");
  }
};

export const factureCount = async () => {
  try {
    const count = await prisma.facture.count({});
    return count;
  } catch (err) {
    throw new Error("Une erreure s'est produite");
  }
};

export const paiedFactureCount = async (Statut) => {
  try {
    const count = await prisma.facture.count({
      where: { Statut },
    });
    return count;
  } catch (err) {
    throw new Error("Une erreure s'est produite");
  }
};

export const totalPaid = async (Statut) => {
  const result = await prisma.facture.aggregate({
    _sum: {
      Montant_Total: true,
    },
    where: {
      Statut: Statut,
    },
  });

  const totalUnpaidAmount = result._sum.Montant_Total || 0;
  return totalUnpaidAmount;
};
export const totalAll = async (Statut) => {
  const result = await prisma.facture.aggregate({
    _sum: {
      Montant_Total: true,
    },
  });

  const totalUnpaidAmount = result._sum.Montant_Total || 0;

  return totalUnpaidAmount;
};

export const getFactureSummary = async () => {
  const unpaidFactures = await prisma.facture.groupBy({
    by: ["Date_Emission"],
    _sum: {
      Montant_Total: true,
    },
    where: {
      Statut: "Non payé",
    },
  });

  const paidFactures = await prisma.facture.groupBy({
    by: ["Date_Emission"],
    _sum: {
      Montant_Total: true,
    },
    where: {
      Statut: "payé",
    },
  });
  console.log(paidFactures);
  console.log(unpaidFactures);
  return { unpaidFactures, paidFactures };
};

export const getLatestTransactions = async () => {
  try {
    const latestTransactions = await prisma.paiement.findMany({
      orderBy: {
        Date_Paiement: "desc",
      },
      include: {
        facture: true,
      },
      take: 5,
    });
    return latestTransactions;
  } catch (error) {
    console.error("Error fetching latest transactions:", error);
    return [];
  }
};
