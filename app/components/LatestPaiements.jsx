import React from "react";
import { getLatestTransactions } from "../../actions/stats";
import moment from "moment";

const LatestPaiements = async () => {
  const paiements = await getLatestTransactions();
  return (
    <div>
      <table className="min-w-full bg-gray-100 border rounded-lg shadow-lg">
        <thead className="bg-slate-300 text-gray-700">
          <tr>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">N° Facture</th>
            <th className="py-2 px-3 text-left">Montant</th>
            <th className="py-2 px-3 text-left">Mode</th>
            <th className="py-2 px-3 text-left">Statut</th>
          </tr>
        </thead>
        <tbody>
          {paiements.map((paiement, index) => (
            <tr
              key={paiement.ID_Paiement}
              className={index % 2 === 0 ? "bg-slate-50" : "bg-slate-200"}
            >
              <td className="py-2 px-3">
                {moment(paiement.Date_Paiement).format("DD-MM-YYYY")}
              </td>
              <td className="py-2 px-3">{paiement.facture.Numero_Facture}</td>
              <td className="py-2 px-3">CDF {paiement.Montant_Paye}</td>
              <td className="py-2 px-3">{paiement.Mode_Paiement}</td>
              <td
                className={`"py-2 px-3" ${
                  paiement.Approuve ? "text-green-600" : "text-red-700"
                } `}
              >
                {paiement.Approuve ? "Approuvé" : "En attente"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestPaiements;
