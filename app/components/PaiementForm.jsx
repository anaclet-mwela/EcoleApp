"use client";
// components/PaiementForm.js

import { useState, useEffect } from "react";
import { FaRegTimesCircle, FaTrash } from "react-icons/fa";
import { ajouterPaiement } from "../../actions/paymentsActions"; // Adjust the action import as per your project
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const PaiementForm = ({ factures, payments }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFactures, setFilteredFactures] = useState([]);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [amountToPay, setAmountToPay] = useState("");
  const [paymentMode, setPaymentMode] = useState("cash"); // Default payment mode
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [montantError, setMontantError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm && !selectedFacture) {
      const filtered = factures.filter((facture) =>
        facture.Numero_Facture.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFactures(filtered);
    } else {
      setFilteredFactures([]);
    }
  }, [searchTerm, selectedFacture, factures]);

  const handleSelectFacture = (facture) => {
    setSelectedFacture(facture);
    setSearchTerm(facture.Numero_Facture);
    setFilteredFactures([]);
    setAmountToPay(""); // Reset amount input
    setErrorMessage("");
  };

  const handleClearSelection = () => {
    setSelectedFacture(null);
    setSearchTerm("");
    setAmountToPay("");
  };

  const handleDeletePayment = () => {
    setSelectedFacture(null);
    setAmountToPay("");
  };

  const totalPaiement = () => {
    const total = payments
      .filter((paiement) => paiement.ID_Facture === selectedFacture.ID_Facture)
      .reduce((total, paiement) => total + paiement.Montant_Paye, 0);
    return total;
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    // Validate selected facture and amount
    if (selectedFacture && amountToPay !== "") {
      const newPayment = {
        ID_Facture: selectedFacture.ID_Facture,
        Montant_Paye: parseFloat(amountToPay),
        Mode_Paiement: paymentMode,
      };

      try {
        const response = await ajouterPaiement(newPayment); // Function to add payment to backend
        if (response.success) {
          setErrorMessage(""); // Clear error message on successful submission
          setMontantError(false);
          router.refresh();
        } else {
          setErrorMessage(
            response.error ||
              "Unne erreur s'est produite. Veuillez recommencer."
          );
        }
      } catch (error) {
        setErrorMessage(
          error.message || "Unne erreur s'est produite. Veuillez recommencer."
        );
        setMontantError(true);
      }
    } else {
      setErrorMessage(
        "Veillez choisir une facture et entrez le montant à payer."
      ); // Set error message
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-2xl font-bold text-orange-500 mb-8">
        Effectuer un Paiement
      </h4>
      <div className="flex items-center gap-4 relative w-fit">
        <p className="font-bold">Facture:</p>{" "}
        <input
          type="text"
          name="search"
          placeholder="Chercher facture par numéro"
          className="block p-2 bg-orange-100 rounded-md focus:ring-1 focus:ring-orange-500 w-52"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setSelectedFacture(null)}
        />
        {selectedFacture && (
          <div>
            <button
              className="mt-2 px-4 py-2 text-red-500 text-2xl rounded-full"
              onClick={handleClearSelection}
            >
              <FaRegTimesCircle />
            </button>
          </div>
        )}
        {filteredFactures.length > 0 && !selectedFacture && (
          <ul className="list-none border border-orange-400 rounded-md absolute top-12 right-0 w-52 bg-slate-100">
            {filteredFactures.map((facture) => (
              <li
                key={facture.ID_Facture}
                className="p-2 cursor-pointer hover:bg-orange-100 rounded-md border-b-1 border-b-slate-300"
                onClick={() => handleSelectFacture(facture)}
              >
                {facture.Numero_Facture}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedFacture && (
        <div className="mt-4">
          <p>
            <span className="font-bold">Montant Total:</span>{" "}
            {selectedFacture.Montant_Total}$
          </p>
          <p>
            <span className="font-bold">Déjà Payé:</span> {totalPaiement()}$
          </p>
          <label htmlFor="amountToPay" className="block mt-2 font-bold">
            Montant à Payer:
          </label>
          <input
            type="number"
            id="amountToPay"
            value={amountToPay}
            onChange={(e) => setAmountToPay(e.target.value)}
            className={`p-2 bg-slate-100 rounded-md focus:ring-1 focus:ring-orange-500 w-52 ${
              montantError ? "border border-red-700 text-red-700" : ""
            }`}
            step="0.01" // If you need decimals
          />

          <label htmlFor="paymentMode" className="block mt-2 font-bold">
            Mode de Paiement:
          </label>
          <select
            id="paymentMode"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="p-2 bg-slate-100 rounded-md focus:ring-1 focus:ring-orange-500 w-52"
          >
            <option value="cash">Cash</option>
            <option value="airtel">Airtel Money</option>
            <option value="mpesa">Mpesa</option>
            <option value="orange">Orange</option>
          </select>
        </div>
      )}

      <button
        onClick={handlePaymentSubmit}
        className="py-2 px-4 border bg-green-600 rounded-md text-white mt-4"
      >
        Effectuer le Paiement
      </button>
      {errorMessage && (
        <div className="text-red-700 p-4 border border-red-700 rounded-md text-center bg-red-200">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default PaiementForm;
