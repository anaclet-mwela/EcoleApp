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
    <div className="grid grid-cols-2 h-screen">
      <div className="h-full bg-orange-500 text-white grid place-items-center">
        <h4 className="text-4xl font-bold mb-8">CS DANIELLA</h4>
      </div>
      <div className="bg-gray-300 grid place-items-center rounded-md p-4 shadow-md  flex-col gap-8 items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
