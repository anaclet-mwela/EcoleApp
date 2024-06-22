// src/components/LoginPage.js
import React from "react";

import { getSession } from "../actions/authActions";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";

const LoginPage = async () => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/admin");
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="bg-orange-300 grid place-items-center rounded-md p-4 shadow-md  flex-col gap-8 items-center">
        <h1 className="text-xl font-bold">Complexe Scolaire Danniella</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
