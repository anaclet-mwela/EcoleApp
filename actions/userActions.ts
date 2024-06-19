"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

interface User {
  ID_Administrateur: string;
  Nom: string;
  Prenom: string;
  Nom_Utilisateur: string;
  Mot_de_Passe: string;
  Role: string;
}

export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const user = await prisma.administrateur.findUnique({
      where: { Nom_Utilisateur: username },
    });
    return user as User | null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getUsers = async (): Promise<User[] | null> => {
  try {
    const users = await prisma.administrateur.findMany({  
    });
    return users 
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteUser = async (formData: FormData): Promise<User[] | null> => {
  const ID_Administrateur = formData.get("id") as string
  try {
    const user = await prisma.administrateur.delete({  
      where: {
        ID_Administrateur
      }
    });
    revalidatePath("/admin/users")
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addUser = async (formData: FormData): Promise<User[] | null> => {

  const Nom = formData.get("nom") as string
  const Prenom = formData.get("prenom") as string
  const Mot_de_Passe = formData.get("password") as string
  const Nom_Utilisateur = formData.get("username") as string

  try {
    const user = await prisma.administrateur.create({ 
      data: {
        Nom,
        Prenom,
        Mot_de_Passe,
        Nom_Utilisateur,
        Role: 'admin'
      } 
    });
revalidatePath("/admin/users")
  } catch (error) {
    console.error(error);
    return null;
  }
};

