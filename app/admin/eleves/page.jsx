"use server"
import { getEleves, supprimerEleve } from "../../../actions/elevesActions";
import Link from "next/link";
import Search from "../../components/Search";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import { FaEye, FaPlusCircle } from "react-icons/fa";
import moment from "moment";

const page = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const f = searchParams?.f || "Nom";
  const o = searchParams?.o || "asc";
  const eleves = await getEleves(f, q, o);
  

  return (
    <div className="p-8 text-slate-900 ">
      <div className="flex items-center justify-between py-2 px-4 bg-orange-400 rounded-tl-md rounded-tr-md text-orange-50">
        <div className="flex items-center gap-8">
          <h4 className="font-medium text-2xl capitalize">élèves</h4>
          <Search placeholder="Rechercher eleve.." />
          <Filter />
        </div>

        <Link
          href="/admin/eleves/form"
          className="flex items-center gap-2 bg-orange-700 rounded-md px-4 py-2"
        >
          {" "}
          <FaPlusCircle /> Ajouter
        </Link>
      </div>
      <table className="mt-1 table-auto w-full border-collapse border border-orange-400 rounded-tl-md rounded-tr-md">
        <thead>
          <tr className="bg-orange-400 text-slate-700 font-bold rounded-tl-md rounded-tr-md text-left">
            <th></th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date de Naissance</th>
            <th>Sexe</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Classe</th>
            <th>Filière</th>
            <th>Professeur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-300">
          {eleves &&
            eleves.map((eleve, index) => (
              <tr
                key={eleve.ID_Eleve}
                className={`${
                  index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"
                }`}
              >
                <td>
                  <img
                    src="/avatar.jpg"
                    alt=""
                    className="rounded-full h-10 w-10"
                  />
                </td>
                <td>{eleve.Nom}</td>
                <td>{eleve.Prenom}</td>
                <td>{moment(eleve.Date_Naissance).format("DD-MM-YYYY")} </td>
                <td>{eleve.Sexe}</td>
                <td>{eleve.Adresse}</td>
                <td>{eleve.Numero_Telephone}</td>
                <td>{eleve.classe.Nom_Classe}</td>
                <td>{eleve.classe.Filiere}</td>
                <td>{eleve.classe.Professeur_Principal}</td>
                <td className="flex items-center gap-4">
                  <Link
                    href={`/admin/eleves/${eleve.ID_Eleve}`}
                    className="py-1 px-4 flex gap-4 items-center bg-orange-700 hover:bg-orange-600 text-white rounded-md"
                  >
                    <FaEye /> Voir
                  </Link>
                  <form action={supprimerEleve}>
                    <input type="hidden" name="id" value={eleve.ID_Eleve} />
                    <button type="submit">Suprimmer</button>
                  </form>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default page;
