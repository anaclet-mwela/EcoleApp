// src/components/LoginPage.js
import React from "react";

import { getSession } from "../actions/authActions";
import { redirect } from "next/navigation";
import LoginForm  from "./components/LoginForm";

const LoginPage = async () => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/admin");
  }

  return (
    <div className="grid place-items-center h-full w-full bg-slate-300">
      <div>
        <h4 className="text-4xl font-bold mb-8">CS DANIELLA</h4>
        <div className="bg-orange-300 rounded-md p-4 shadow-md flex flex-col gap-8 items-center">
          <h1 className="font-bold text-slate-800 text-2xl">Connexion</h1>
          <LoginForm />
        </div>
        <p className="text-center text-slate-500 mt-32">
          Travail de Memoir Deborah
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
