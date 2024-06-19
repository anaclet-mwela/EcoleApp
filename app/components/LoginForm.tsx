"use client";
import { login } from "../../actions/authActions";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);
  return (
    <form action={formAction} className="flex flex-col gap-4 w-72">
      <input type="text" placeholder="admin" name="username" className="p-2 bg-slate-100 rounded-md focus:ring-1 focus:ring-orange-500 mr-2"/>
      <input type="password" placeholder="mot de passe" name="password" className="p-2 bg-slate-100 rounded-md focus:ring-1 focus:ring-orange-500 mr-2"/>
      <button className="bg-blue-500 text-white rounded-md py-2 px-4">Connexion</button>
      {state.error && <p className="text-red-500 text-center border border-red-500 rounded-md p-2">{state?.error}</p>}
    </form>
  );
}