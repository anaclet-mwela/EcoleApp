import React from "react";
import {
  ajouterFrais,
  getFrais,
  supprimerFrais,
} from "../../../actions/fraisActions";
import { FaTimesCircle } from "react-icons/fa";
const FraisPage = async () => {
  const frais = await getFrais();

  return (
    <div className="m-8">
      <h1 className="text-xl font-bold text-orange-600 mb-8">
        Gestion des frais
      </h1>
      <div className="grid grid-cols-2 gap-16">
        <div>
          <table className="mt-1 table-auto w-full border-collapse border border-orange-400 rounded-tl-md rounded-tr-md">
            <thead>
              <tr className="bg-orange-400 text-slate-700 font-bold rounded-tl-md rounded-tr-md text-left">
                <th>Description</th>
                <th>Montant</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-300">
              {frais &&
                frais.map((frai, index) => (
                  <tr
                    key={frai.ID_Frais}
                    className={`${
                      index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"
                    }`}
                  >
                    <td>{frai.Description}</td>

                    <td>CDF {frai.Montant}</td>
                    <td className="flex items-center gap-4">
                      <form action={supprimerFrais}>
                        <input type="hidden" name="ID_Frais" value={frai.ID_Frais} />
                        <button className="py-1 px-4 flex gap-4 items-center bg-orange-700 hover:bg-orange-600 text-white rounded-md">
                          <FaTimesCircle /> supprimer
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Formulaire */}
        <div>
          <form action={ajouterFrais}>
            <div className="p-8 border border-orange-600  rounded-md">
              <h4 className="text-2xl font bold text-orange-600 mb-8 text-center">
                Ajouter des frais
              </h4>
              <div className="flex flex-col gap-4">
                <div className="flex gap-8 items-center">
                  <label htmlFor="Description" className="w-1/3 text-right">
                    Description:
                  </label>
                  <input
                    type="text"
                    name="Description"
                    className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                  />
                </div>
                <div className="flex gap-8 items-center">
                  <label htmlFor="Montant" className="w-1/3 text-right">
                    Montant:
                  </label>
                  <input
                    type="number"
                    name="Montant"
                    className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                  />
                </div>
              </div>
              <div className="flex gap-8 justify-center mt-8">
                <button
                  type="reset"
                  className="py-2 px-4 border border-orange-600 text-orange-700 rounded-md hover:bg-orange-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500"
                >
                  Enrregistrer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FraisPage;
