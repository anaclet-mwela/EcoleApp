import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { ajouterAnnee, fetchAnnees, supprimerAnnee } from "../../../actions/anneeActions";
import moment from "moment";
const AnneePage = async () => {
  const annees = await fetchAnnees();

  return (
    <div className="m-8">
      <h1 className="text-xl font-bold text-orange-600 mb-8">
        Gestion des Ann&eacute;es Scolaires
      </h1>
      <div className="grid grid-cols-2 gap-16">
        <div>
          <table className="mt-1 table-auto w-full border-collapse border border-orange-400 rounded-tl-md rounded-tr-md">
            <thead>
              <tr className="bg-orange-400 text-slate-700 font-bold rounded-tl-md rounded-tr-md text-left">
                <th>D&eacute;but Ann&eacute;e</th>
                <th>Fin Ann&eacute;e</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-300">
              {annees &&
                annees.map((annee, index) => (
                  <tr
                    key={annee.ID_Annee}
                    className={`${
                      index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"
                    }`}
                  >
                    <td>{moment(annee.Annee_Debut).format("YYYY")}</td>

                    <td> {moment(annee.Annee_Fin).format("YYYY")}</td>
                    <td className="flex items-center gap-4">
                      <form action={supprimerAnnee}>
                        <input
                          type="hidden"
                          name="ID_Annee"
                          value={annee.ID_Annee}
                        />
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
          <form action={ajouterAnnee}>
            <div className="p-8 border border-orange-600  rounded-md">
              <h4 className="text-2xl font bold text-orange-600 mb-8 text-center">
                Ajouter une ann&eacute;e scolaire
              </h4>
              <div className="flex flex-col gap-4">
                <div className="flex gap-8 items-center">
                  <label htmlFor="Annee_Debut" className="w-1/3 text-right">
                    Debut:
                  </label>
                  <input
                    type="date"
                    name="Annee_Debut"
                    className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                  />
                </div>
                <div className="flex gap-8 items-center">
                  <label htmlFor="Annee_Fin" className="w-1/3 text-right">
                    Fin:
                  </label>
                  <input
                    type="date"
                    name="Annee_Fin"
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

export default AnneePage;
