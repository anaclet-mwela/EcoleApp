import React from "react";
import { fetchEleves } from "../../../actions/elevesActions";
import { getFrais } from "../../../actions/fraisActions";
import Link from "next/link";
import Search from "../../components/Search";
import FactureFiltre from "../../components/FactureFiltre";
import { FaEye, FaMoneyBill, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import {
  getFactures,
  supprimerFacture,
} from "../../../actions/facturesActions";
import FactureForm from "../../components/FactureForm";
import moment from "moment";
import { getPayments } from "../../../actions/paymentsActions";

const page = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const f = searchParams?.f || "Tout";

  const factures = await getFactures(q, f);
  const eleves = await fetchEleves();
  const frais = await getFrais();
  const payments = await getPayments();

  const getSold = (factureId) => {
    return payments
      .filter((paiement) => paiement.ID_Facture === factureId)
      .reduce((total, paiement) => total + paiement.Montant_Paye, 0);
  };

  return (
    <div className="flex ">
      <div className="p-8 text-slate-900 flex-1">
        <div className="flex items-center justify-between py-2 px-4 bg-orange-400 rounded-tl-md rounded-tr-md text-orange-50">
          <div className="flex items-center gap-8">
            <h4 className="font-medium text-2xl capitalize">Factures</h4>
            <Search placeholder="Rechercher eleve.." />
            <FactureFiltre />
          </div>
        </div>
        <table className="mt-1 table-auto w-full border-collapse border border-orange-400 rounded-tl-md rounded-tr-md">
          <thead>
            <tr className="bg-orange-400 text-slate-700 font-bold rounded-tl-md rounded-tr-md text-left">
              <th>Numero</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Eleve</th>
              <th>Payé</th>
              <th>Sold</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-300 text-sm">
            {factures &&
              factures.map((facture, index) => (
                <tr
                  key={facture.ID_Facture}
                  className={`${
                    index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"
                  }`}
                >
                  <td>{facture.Numero_Facture}</td>
                  <td>{moment(facture.Date_Emission).format("DD-MM-YYYY")}</td>

                  <td>$ {facture.Montant_Total}</td>
                  <td>
                    {facture.eleve.Nom} {facture.eleve.Prenom}
                  </td>
                  <td>$ {getSold(facture.ID_Facture)}</td>
                  <td>
                    $ {facture.Montant_Total - getSold(facture.ID_Facture)}
                  </td>
                  <td>{facture.Statut}</td>
                  <td className="flex items-center gap-4">
                    <Link
                      href={`/admin/factures/${facture.ID_Facture}`}
                      className="py-1 px-4 flex gap-4 items-center  text-green-500 rounded-md"
                    >
                      <FaEye />
                    </Link>
                    <form action={supprimerFacture}>
                      <input
                        type="hidden"
                        name="id"
                        value={facture.ID_Facture}
                      />
                      <button className="py-1 px-4 flex gap-4 items-center  hover:text-red-500 text-orange-500 rounded-md">
                        <FaTrashAlt />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* right side */}
      <div className="w-1/3 h-[600px] border border-slate-400 rounded-md shadow-md mt-8 mr-8 p-6 bg-white">
        <FactureForm eleves={eleves} frais={frais} />
      </div>
    </div>
  );
};

export default page;
