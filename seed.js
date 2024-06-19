const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Créer des années scolaires
  const annees = [
    {
      ID_Annee: "1",
      Annee_Debut: new Date("2023-09-01"),
      Annee_Fin: new Date("2024-06-30"),
    },
    {
      ID_Annee: "2",
      Annee_Debut: new Date("2024-09-01"),
      Annee_Fin: new Date("2025-06-30"),
    },
  ];
  for (const annee of annees) {
    await prisma.annee.create({ data: annee });
  }

  // Créer des classes
  const classes = [
    {
      ID_Classe: "1",
      Nom_Classe: "1A",
      Niveau: "1e",
      Filiere: "Scientifique",
      Professeur_Principal: "M. Dupont",
      annee: { connect: { ID_Annee: "1" } },
    },
    {
      ID_Classe: "2",
      Nom_Classe: "2B",
      Niveau: "2e",
      Filiere: "Littéraire",
      Professeur_Principal: "Mme. Martin",
      annee: { connect: { ID_Annee: "2" } },
    },
  ];
  for (const classe of classes) {
    await prisma.classe.create({ data: classe });
  }

  // Créer des élèves
  const eleves = [
    {
      ID_Eleve: "1",
      Nom: "Durand",
      Prenom: "Alice",
      Date_Naissance: new Date("2010-01-15"),
      Sexe: "F",
      Adresse: "123 Rue Principale",
      Numero_Telephone: "0102030405",
      Adresse_Email: "alice.durand@example.com",
      Parent_Tuteur: "M. Durand",
      Photo: "alice.jpg",
      Code_Acces: "alice123",
      Mot_de_Passe: "password123",
      classe: { connect: { ID_Classe: "1" } },
    },
    {
      ID_Eleve: "2",
      Nom: "Martin",
      Prenom: "Bob",
      Date_Naissance: new Date("2011-02-20"),
      Sexe: "M",
      Adresse: "456 Rue Secondaire",
      Numero_Telephone: "0102030406",
      Adresse_Email: "bob.martin@example.com",
      Parent_Tuteur: "Mme. Martin",
      Photo: "bob.jpg",
      Code_Acces: "bob123",
      Mot_de_Passe: "password123",
      classe: { connect: { ID_Classe: "2" } },
    },
    // Ajoutez 3 autres élèves ici
  ];
  for (const eleve of eleves) {
    await prisma.eleve.create({ data: eleve });
  }

  // Créer des administrateurs
  const administrateurs = [
    {
      ID_Administrateur: "1",
      Nom: "Admin",
      Prenom: "One",
      Nom_Utilisateur: "admin1",
      Mot_de_Passe: "adminpass1",
      Role: "SuperAdmin",
    },
    {
      ID_Administrateur: "2",
      Nom: "Admin",
      Prenom: "Two",
      Nom_Utilisateur: "admin2",
      Mot_de_Passe: "adminpass2",
      Role: "Admin",
    },
    // Ajoutez 3 autres administrateurs ici
  ];
  for (const admin of administrateurs) {
    await prisma.administrateur.create({ data: admin });
  }

  // Créer des factures
  const factures = [
    {
      ID_Facture: "1",
      ID_Eleve: "1",
      ID_Annee: "1",
      Montant_Total: 200.0,
      Date_Echeance: new Date("2023-12-31"),
      Statut: "Non payé",
    },
    {
      ID_Facture: "2",
      ID_Eleve: "2",
      ID_Annee: "2",
      Montant_Total: 250.0,
      Date_Echeance: new Date("2024-12-31"),
      Statut: "Non payé",
    },
    // Ajoutez 3 autres factures ici
  ];
  for (const facture of factures) {
    await prisma.facture.create({ data: facture });
  }

  // Créer des frais pour chaque facture
  const fraisList = [
    {
      ID_Frais: "1",
      Description: "Frais d'inscription",
      Montant: 100.0,
      Facture: { connect: { ID_Facture: "1" } },
    },
    {
      ID_Frais: "2",
      Description: "Minervales",
      Montant: 100.0,
      Facture: { connect: { ID_Facture: "1" } },
    },
    {
      ID_Frais: "3",
      Description: "Frais d'inscription",
      Montant: 150.0,
      Facture: { connect: { ID_Facture: "2" } },
    },
    {
      ID_Frais: "4",
      Description: "Minervales",
      Montant: 100.0,
      Facture: { connect: { ID_Facture: "2" } },
    },
    // Ajoutez plus de frais ici
  ];
  for (const frais of fraisList) {
    await prisma.frais.create({ data: frais });
  }

  // Créer des paiements
  const paiements = [
    {
      ID_Paiement: "1",
      ID_Facture: "1",
      Montant_Paye: 100.0,
      Mode_Paiement: "En ligne",
      Date_Paiement: new Date("2023-10-01"),
      Approuve: false,
    },
    {
      ID_Paiement: "2",
      ID_Facture: "2",
      Montant_Paye: 150.0,
      Mode_Paiement: "En ligne",
      Date_Paiement: new Date("2024-10-01"),
      Approuve: false,
    },
    // Ajoutez plus de paiements ici
  ];
  for (const paiement of paiements) {
    await prisma.paiement.create({ data: paiement });
  }

  console.log("Seeding terminé.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
