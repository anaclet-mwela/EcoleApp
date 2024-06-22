"use server"

import { SessionData } from "../lib/auth"; 
import { defaultSession, sessionOptions } from "../lib/auth";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {getUserByUsername} from "../actions/userActions"


interface User {
  ID_Administrateur: string;
  Nom: string;
  Prenom: string;
  Nom_Utilisateur: string;
  Mot_de_Passe: string;
  Role: string;
}


// ADD THE GETSESSION ACTION
export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // If user visits for the first time session returns an empty object.
  // Let's add the isLoggedIn property to this object and its value will be the default value which is false
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

// ADD THE LOGIN ACTION
export async function login(
  prevState: { error: undefined | string },
  formData: FormData
) {
  const session = await getSession();

  const username = formData.get("username") as string
  const password = formData.get("password") as string
 
   const user: User | null = await getUserByUsername(username);
  
 
  // // IF CREDENTIALS ARE WRONG RETURN AN ERROR
  if(!user){
    return { error: "Utilisateur ou Mot de passe incorrect" }
  }
  const { Mot_de_Passe, Nom, Prenom, Nom_Utilisateur, Role } = user;
  if(Mot_de_Passe !== password){
    return { error: "Mot de pass incorect!" }
  }

  session.isLoggedIn = true;
  session.userId = user.ID_Administrateur;
  session.username = Nom_Utilisateur;
 
  await session.save();
  redirect("/admin")
}


// ADD THE LOGOUT FUNCTION
export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/")
}
