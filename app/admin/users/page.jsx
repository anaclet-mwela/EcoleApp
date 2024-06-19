import React from "react";
import { addUser, deleteUser, getUsers } from "../../../actions/userActions";
import Link from "next/link";
import { FaAddressBook, FaEdit, FaEye } from "react-icons/fa";

const page = async () => {
  const users = await getUsers();
  return (
    <div className="m-8 grid grid-cols-2 gap-16">
      <div>
        <table className="mt-1 table-auto w-full border-collapse border border-orange-400 rounded-tl-md rounded-tr-md">
          <thead>
            <tr className="bg-orange-400 text-slate-700 font-bold rounded-tl-md rounded-tr-md text-left">
              <th>Nom</th>
              <th>Prénom</th>
              <th>Nom Utilisateur</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-300">
            {users &&
              users.map((user, index) => (
                <tr
                  key={user.ID_Administrateur}
                  className={`${
                    index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"
                  }`}
                >
                  <td>{user.Nom}</td>
                  <td>{user.Prenom}</td>
                  <td>{user.Nom_Utilisateur}</td>

                  <td className="flex items-center gap-4">
                    <Link
                      href={`/admin/eleves/${user.ID_Administrateur}`}
                      className="py-1 px-4 flex gap-4 items-center bg-orange-700 hover:bg-orange-600 text-white rounded-md"
                    >
                      <FaEdit /> Editer
                    </Link>
                    <form action={deleteUser}>
                      <input
                        type="hidden"
                        name="id"
                        value={user.ID_Administrateur}
                      />
                      <button type="submit">Suprimmer</button>
                    </form>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 p-8 bg-white rounded-md text-slate-700">
        <h4 className="text-2xl font-bold text-orange-500 mb-8 flex items-center gap-2">
          <FaAddressBook /> Ajouter un administrateur
        </h4>
        <form action={addUser} className="flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <label htmlFor="amountToPay" className="block mt-2 w-52 text-right">
              Nom utilisateur
            </label>
            <input
              type="text"
              name="username"
              className={`p-2 bg-orange-100 rounded-md focus:ring-1 focus:ring-orange-500 flex-1 
            }`}
            />
          </div>
          <div className="flex items-center gap-8">
            <label htmlFor="amountToPay" className="block mt-2 w-52 text-right">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className={`p-2 bg-orange-100 rounded-md focus:ring-1 focus:ring-orange-500 flex-1 
            }`}
            />
          </div>
          <div className="flex items-center gap-8">
            <label htmlFor="amountToPay" className="block mt-2 w-52 text-right">
              Confirmer Password:
            </label>
            <input
              type="password"
              name="confirm_password"
              className={`p-2 bg-orange-100 rounded-md focus:ring-1 focus:ring-orange-500 flex-1 
            }`}
            />
          </div>
          <div className="flex items-center gap-8">
            <label htmlFor="amountToPay" className="block mt-2 w-52 text-right">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              className={`p-2 bg-orange-100 rounded-md focus:ring-1 focus:ring-orange-500 flex-1 
            }`}
            />
          </div>
          <div className="flex items-center gap-8">
            <label htmlFor="amountToPay" className="block mt-2 w-52 text-right">
              Prenom
            </label>
            <input
              type="text"
              name="prenom"
              className={`p-2 bg-orange-100 rounded-md focus:ring-1 focus:ring-orange-500 flex-1 
            }`}
            />
          </div>
          <div className="flex gap-4 items-center justify-center">
            <button className="bg-blue-500 text-white py-2 px-4 text-center rounded-md mt-4 w-fit">
              Enrregister
            </button>
            <button
              type="reset"
              className="border border-orange-500 text-orange-500 py-2 px-4 text-center rounded-md mt-4 w-fit"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
