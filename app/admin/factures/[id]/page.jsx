import React from "react";
import { getFactureById } from "../../../../actions/facturesActions";
import moment from "moment";

const page = async ({ params }) => {
  const { id } = params;
  const facture = await getFactureById(id);
  console.log(facture);

  const totalPaiement = facture.Paiement.reduce(
    (total, paiement) => total + paiement.Montant_Paye,
    0
  );

  return (
    <div className="m-8">
      <div className="border border-slate-500 rounded-md p-8 w-1/2 bg-white">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-xl uppercase">
              Complexe Scolaire Danniela
            </p>
            <p>Q Basketeur, Lubumbashi, RDC</p>
            <p>+243 0147 236 9874 / 12456398</p>
          </div>
          <div className="flex flex-col gap-2">
            <p
              className={`text-4xl uppercase font-black ${
                facture.Statut === "Non Paye"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {facture.Statut}
            </p>

            <p>
              <span className="text-xl font-bold">
                #{facture.Numero_Facture}{" "}
              </span>
            </p>
            <p className="text-4xl font-bold text-slate-500">
              ${facture.Montant_Total}{" "}
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <p>Date: {moment(facture.Date_Emission).format("DD MMMM yyyy")} </p>
        </div>
        <div>
          <p>
            Elève: {facture.eleve.Nom} {facture.eleve.Prenom}{" "}
          </p>
        </div>
        <div className="mt-6">
          <p className="text-xl font-semibold">Paiements</p>
          <table className="mt-1 table-auto w-full border-collapse border border-orange-400 rounded-tl-md rounded-tr-md">
            <thead>
              <tr className="bg-orange-400 text-slate-700 font-bold rounded-tl-md rounded-tr-md text-left">
                <td>Date</td>
                <td>Montant</td>
                <td>Statut</td>
              </tr>
            </thead>
            <tbody>
              {facture.Paiement.map((paiement) => (
                <tr key={paiement.ID_Facture}>
                  <td>
                    {" "}
                    {moment(paiement.Date_Paiement).format("DD-MM-YYYY")}{" "}
                  </td>
                  <td> {paiement.Montant_Paye} </td>
                  <td> {paiement.Approuve ? "Approuvé" : "Non Aprouvé"} </td>
                </tr>
              ))}
              <tr>
                <td className="font-bold">Total:</td>
                <td>$ {totalPaiement} </td>
              </tr>
              <tr>
                <td className="font-bold">Reste à payer:</td>
                <td>$ {facture.Montant_Total - totalPaiement} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
