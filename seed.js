const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // // Seed Annee
  // const annees = await prisma.annee.createMany({
  //   data: [
  //     {
  //       Annee_Debut: new Date("2020-01-01"),
  //       Annee_Fin: new Date("2020-12-31"),
  //     },
  //     {
  //       Annee_Debut: new Date("2021-01-01"),
  //       Annee_Fin: new Date("2021-12-31"),
  //     },
  //     {
  //       Annee_Debut: new Date("2022-01-01"),
  //       Annee_Fin: new Date("2022-12-31"),
  //     },
  //     {
  //       Annee_Debut: new Date("2023-01-01"),
  //       Annee_Fin: new Date("2023-12-31"),
  //     },
  //     {
  //       Annee_Debut: new Date("2024-01-01"),
  //       Annee_Fin: new Date("2024-12-31"),
  //     },
  //   ],
  // });

  // // Seed Classe
  // const classes = await prisma.classe.createMany({
  //   data: [
  //     {
  //       Nom_Classe: "1A",
  //       Niveau: "1e",
  //       Filiere: "Science",
  //       Professeur_Principal: "Prof 1",
  //       anneeId: annees[0].ID_Annee,
  //     },
  //     {
  //       Nom_Classe: "1B",
  //       Niveau: "1e",
  //       Filiere: "Arts",
  //       Professeur_Principal: "Prof 2",
  //       anneeId: annees[1].ID_Annee,
  //     },
  //     {
  //       Nom_Classe: "2",
  //       Niveau: "2e",
  //       Filiere: "Commerce",
  //       Professeur_Principal: "Prof 3",
  //       anneeId: annees[2].ID_Annee,
  //     },
  //     {
  //       Nom_Classe: "Classe 4",
  //       Niveau: "4e",
  //       Filiere: "Science",
  //       Professeur_Principal: "Prof 4",
  //       anneeId: annees[3].ID_Annee,
  //     },
  //     {
  //       Nom_Classe: "Classe 5",
  //       Niveau: "5e",
  //       Filiere: "Arts",
  //       Professeur_Principal: "Prof 5",
  //       anneeId: annees[4].ID_Annee,
  //     },
  //   ],
  // });

  // // Seed Eleve
  // const eleves = await prisma.eleve.createMany({
  //   data: [
  //     {
  //       Nom: "Doe",
  //       Prenom: "John",
  //       Date_Naissance: new Date("2000-01-01"),
  //       Sexe: "M",
  //       Adresse: "123 Main St",
  //       Numero_Telephone: "555-555-5555",
  //       Adresse_Email: "john.doe@example.com",
  //       Parent_Tuteur: "Jane Doe",
  //       classeId: classes[0].ID_Classe,
  //     },
  //     {
  //       Nom: "Smith",
  //       Prenom: "Jane",
  //       Date_Naissance: new Date("2001-02-02"),
  //       Sexe: "F",
  //       Adresse: "456 Oak St",
  //       Numero_Telephone: "555-555-5556",
  //       Adresse_Email: "jane.smith@example.com",
  //       Parent_Tuteur: "John Smith",
  //       classeId: classes[1].ID_Classe,
  //     },
  //     {
  //       Nom: "Johnson",
  //       Prenom: "Jim",
  //       Date_Naissance: new Date("2002-03-03"),
  //       Sexe: "M",
  //       Adresse: "789 Pine St",
  //       Numero_Telephone: "555-555-5557",
  //       Adresse_Email: "jim.johnson@example.com",
  //       Parent_Tuteur: "Janet Johnson",
  //       classeId: classes[2].ID_Classe,
  //     },
  //     {
  //       Nom: "Williams",
  //       Prenom: "Jill",
  //       Date_Naissance: new Date("2003-04-04"),
  //       Sexe: "F",
  //       Adresse: "101 Maple St",
  //       Numero_Telephone: "555-555-5558",
  //       Adresse_Email: "jill.williams@example.com",
  //       Parent_Tuteur: "Jack Williams",
  //       classeId: classes[3].ID_Classe,
  //     },
  //     {
  //       Nom: "Brown",
  //       Prenom: "Jack",
  //       Date_Naissance: new Date("2004-05-05"),
  //       Sexe: "M",
  //       Adresse: "202 Birch St",
  //       Numero_Telephone: "555-555-5559",
  //       Adresse_Email: "jack.brown@example.com",
  //       Parent_Tuteur: "Judy Brown",
  //       classeId: classes[4].ID_Classe,
  //     },
  //   ],
  // });

  // // Seed Administrateur
  // await prisma.administrateur.createMany({
  //   data: [
  //     {
  //       Nom: "Admin",
  //       Prenom: "One",
  //       Nom_Utilisateur: "admin1",
  //       Mot_de_Passe: "password1",
  //       Role: "Super Admin",
  //     },
  //     {
  //       Nom: "Admin",
  //       Prenom: "Two",
  //       Nom_Utilisateur: "admin2",
  //       Mot_de_Passe: "password2",
  //       Role: "Admin",
  //     },
  //     {
  //       Nom: "Admin",
  //       Prenom: "Three",
  //       Nom_Utilisateur: "admin3",
  //       Mot_de_Passe: "password3",
  //       Role: "Admin",
  //     },
  //     {
  //       Nom: "Admin",
  //       Prenom: "Four",
  //       Nom_Utilisateur: "admin4",
  //       Mot_de_Passe: "password4",
  //       Role: "User",
  //     },
  //     {
  //       Nom: "Admin",
  //       Prenom: "Five",
  //       Nom_Utilisateur: "admin5",
  //       Mot_de_Passe: "password5",
  //       Role: "User",
  //     },
  //   ],
  // });

  // // Seed Facture
  // const factures = await prisma.facture.createMany({
  //   data: [
  //     {
  //       Numero_Facture: "CSD-0000001",
  //       ID_Eleve: eleves[0].ID_Eleve,
  //       Montant_Total: 100.0,
  //       Statut: "Non paye",
  //       FraisIds: "1,2",
  //       TotalPaiement: 0,
  //     },
  //     {
  //       Numero_Facture: "CSD-0000002",
  //       ID_Eleve: eleves[1].ID_Eleve,
  //       Montant_Total: 150.0,
  //       Statut: "Non paye",
  //       FraisIds: "2,3",
  //       TotalPaiement: 0,
  //     },
  //     {
  //       Numero_Facture: "CSD-0000003",
  //       ID_Eleve: eleves[2].ID_Eleve,
  //       Montant_Total: 200.0,
  //       Statut: "Non paye",
  //       FraisIds: "3,4",
  //       TotalPaiement: 0,
  //     },
  //     {
  //       Numero_Facture: "CSD-0000004",
  //       ID_Eleve: eleves[3].ID_Eleve,
  //       Montant_Total: 250.0,
  //       Statut: "Non paye",
  //       FraisIds: "4,5",
  //       TotalPaiement: 0,
  //     },
  //     {
  //       Numero_Facture: "CSD-0000005",
  //       ID_Eleve: eleves[4].ID_Eleve,
  //       Montant_Total: 300.0,
  //       Statut: "Non paye",
  //       FraisIds: "5,1",
  //       TotalPaiement: 0,
  //     },
  //   ],
  // });

  // // Seed Paiement
  // await prisma.paiement.createMany({
  //   data: [
  //     {
  //       ID_Facture: factures[0].ID_Facture,
  //       Montant_Paye: 50.0,
  //       Mode_Paiement: "cash",
  //       Approuve: true,
  //     },
  //     {
  //       ID_Facture: factures[1].ID_Facture,
  //       Montant_Paye: 75.0,
  //       Mode_Paiement: "card",
  //       Approuve: true,
  //     },
  //     {
  //       ID_Facture: factures[2].ID_Facture,
  //       Montant_Paye: 100.0,
  //       Mode_Paiement: "bank transfer",
  //       Approuve: true,
  //     },
  //     {
  //       ID_Facture: factures[3].ID_Facture,
  //       Montant_Paye: 125.0,
  //       Mode_Paiement: "cash",
  //       Approuve: false,
  //     },
  //     {
  //       ID_Facture: factures[4].ID_Facture,
  //       Montant_Paye: 150.0,
  //       Mode_Paiement: "card",
  //       Approuve: false,
  //     },
  //   ],
  // });

  // Seed Frais
  await prisma.frais.createMany({
    data: [
      { Description: "Minervale 1e Trimestre", Montant: 50.0 },
      { Description: "Minervale 2e Trimestre", Montant: 50.0 },
      { Description: "Minervale 3e Trimestre", Montant: 70.0 },
      { Description: "Examens", Montant: 25.0 },
      { Description: "Inscription", Montant: 10.0 },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
