import React from "react";
import {
  approuvePaiement,
  deletePaiement,
  getPayments,
} from "../../../actions/paymentsActions";
import moment from "moment";
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import PaiementFilter from "../../components/PaiementFilter";
import Link from "next/link";
import PaiementForm from "../../components/PaiementForm";
import { getAllFactures, getFactures } from "../../../actions/facturesActions";
import Approuve from "../../components/Approuve"

const page = async ({ searchParams }) => {
  const f = searchParams?.f || "Tout";
  const payments = await getPayments(f);
  const factures = await getAllFactures();

  return (
    <div className="m-8 flex gap-8">
      {/* list of payments */}
      <div className="flex-1">
        <h4 className="font-bold text-orange-500 text-xl mb-6">Payements</h4>
        <div className="flex items-center justify-between py-2 px-4 bg-orange-400 rounded-tl-md rounded-tr-md text-orange-50">
          <div className="flex items-center gap-8">
            <h4 className="font-medium text-2xl capitalize">Factures</h4>
            <PaiementFilter />
          </div>
        </div>
        <table className="mt-1 table-auto w-full border-collapse border border-orange-400 rounded-tl-md rounded-tr-md">
          <thead>
            <tr className="bg-orange-400 text-slate-700 font-bold rounded-tl-md rounded-tr-md text-left">
              <th>Date</th>
              <th>Montant</th>
              <th>Facture</th>
              <th>Mode</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-300">
            {payments &&
              payments.map((paiement, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"
                  }`}
                >
                  <td>{moment(paiement.Date_Paiement).format("DD-MM-YYYY")}</td>

                  <td>$ {paiement.Montant_Paye}</td>
                  <td>{paiement.facture.Numero_Facture}</td>

                  <td>{paiement.Mode_Paiement}</td>
                  {paiement.Approuve ? (
                    <td className="text-green-700">Aprouvé</td>
                  ) : (
                    <td className="text-orange-700">En attente</td>
                  )}

                  <td className="flex items-center gap-4">
                    <form action={deletePaiement}>
                      <input
                        type="hidden"
                        name="id"
                        value={paiement.ID_Paiement}
                      />
                      <button className="py-1 p-4 flex gap-4 items-center  hover:bg-orange-600 text-red-500 rounded-md">
                        <FaTrashAlt />
                      </button>
                    </form>
                    {!paiement.Approuve && (
                     <Approuve id={paiement.ID_Paiement}  />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-1/3 p-6 border rounded-md bg-white">
        <PaiementForm factures={factures} payments= {payments} />
      </div>
    </div>
  );
};

export default page;
