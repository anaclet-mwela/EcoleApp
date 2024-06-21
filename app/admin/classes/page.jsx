import React from "react";
import Search from "../../components/Search";
import ClassFilter from "../../components/ClassFilter";
import Pagination from "../../components/Pagination";
import { FaTimesCircle } from "react-icons/fa";
import {
  ajouterClasse,
  fetchClasses,
  supprimerClasse,
} from "../../../actions/classesActions";
import { fetchAnnees } from "../../../actions/anneeActions";
import moment from "moment";

const page = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const f = searchParams?.f || "Nom";
  const o = searchParams?.o || "asc";
  const classes = await fetchClasses(f, q, o);
  const annees = await fetchAnnees();

  return (
    <div className="grid grid-cols-2">
      <div className="p-8 text-slate-900 ">
        <div className="flex items-center justify-between py-2 px-4 bg-orange-400 rounded-tl-md rounded-tr-md text-orange-50">
          <div className="flex items-center gap-8">
            <h4 className="font-medium text-2xl capitalize">classes</h4>
            <Search placeholder="Rechercher eleve.." />
            <ClassFilter />
          </div>
        </div>
        <table className="mt-1 table-auto w-full border-collapse border border-orange-400 rounded-tl-md rounded-tr-md">
          <thead>
            <tr className="bg-orange-400 text-slate-700 font-bold rounded-tl-md rounded-tr-md text-left">
              <th>Nom</th>
              <th>Niveau</th>
              <th>Filière</th>
              <th>Professeur</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-300">
            {classes &&
              classes.map((classe, index) => (
                <tr
                  key={classe.ID_Classe}
                  className={`${
                    index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"
                  }`}
                >
                  <td>{classe.Nom_Classe}</td>
                  <td>{classe.Niveau}</td>
                  <td>{classe.Filiere}</td>
                  <td>{classe.Professeur_Principal}</td>
                  <td className="flex items-center gap-4">
                    <form action={supprimerClasse}>
                      <input type="hidden" name="id" value={classe.ID_Classe} />
                      <button className="py-1 px-4 flex gap-4 items-center bg-orange-700 hover:bg-orange-600 text-white rounded-md">
                        <FaTimesCircle /> supprimer
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination />
      </div>
      {/* right side */}
      <div>
        <form action={ajouterClasse}>
          <div className="p-8 border border-orange-600 m-8 rounded-md">
            <h4 className="text-2xl font bold text-orange-600 mb-8 text-center">
              Créer une classe
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-8 items-center">
                <label htmlFor="Nom" className="w-1/3 text-right">
                  Nom:
                </label>
                <input
                  type="text"
                  name="Nom_Classe"
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                />
              </div>
              <div className="flex gap-8 items-center">
                <label htmlFor="Prenom" className="w-1/3 text-right">
                  Niveau:
                </label>
                <input
                  type="number"
                  name="Niveau"
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                />
              </div>

              <div className="flex gap-8 items-center">
                <label htmlFor="Sexe" className="w-1/3 text-right">
                  Année Scolaire
                </label>
                <select
                  name="anneeId"
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                >
                  <option selected desabled>
                    <p className="text-slate-500">Selectionner une année</p>
                  </option>
                  {annees.map((annee) => (
                    <option value={annee.ID_Annee} key={annee.ID_Annee}>
                      {moment(annee.Annee_Debut).format("yyyy")} -
                      {moment(annee.Annee_Fin).format("yyyy")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-8 items-center">
                <label htmlFor="Parent_Tuteur" className="w-1/3 text-right">
                  Proffeseur Principal
                </label>
                <input
                  type="text"
                  name="Professeur_Principal"
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                />
              </div>
              <div className="flex gap-8 items-center">
                <label htmlFor="Parent_Tuteur" className="w-1/3 text-right">
                  Filière
                </label>
                <input
                  type="text"
                  name="Filiere"
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
                Enrregistre
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
