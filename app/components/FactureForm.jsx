"use client";
import React, { useState, useEffect } from "react";
import { FaRegTimesCircle, FaTrash } from "react-icons/fa";
import { ajouterFacture } from "../../actions/facturesActions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FactureForm = ({ eleves, frais }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEleves, setFilteredEleves] = useState([]);
  const [selectedEleve, setSelectedEleve] = useState(null);
  const [selectedFrais, setSelectedFrais] = useState([]);
  const [totalMontant, setTotalMontant] = useState(0);
  const [newFraisDescription, setNewFraisDescription] = useState("");
  const [newFraisMontant, setNewFraisMontant] = useState("");
  const [searchFraisTerm, setSearchFraisTerm] = useState("");
  const [filteredFrais, setFilteredFrais] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const generateInvoiceNumber = () => {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.T]/g, "")
      .slice(0, 5);
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    const newInvoiceNumber = `CSD-${timestamp}${randomDigits}`;
    setInvoiceNumber(newInvoiceNumber);
  };

  useEffect(() => {
    if (searchTerm && !selectedEleve) {
      generateInvoiceNumber();
      const filtered = eleves.filter((eleve) =>
        `${eleve.Nom} ${eleve.Prenom}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredEleves(filtered);
    } else {
      setFilteredEleves([]);
    }
  }, [searchTerm, selectedEleve, eleves]);

  useEffect(() => {
    if (searchFraisTerm) {
      const filtered = frais.filter((f) =>
        f.Description.toLowerCase().includes(searchFraisTerm.toLowerCase())
      );
      setFilteredFrais(filtered);
    } else {
      setFilteredFrais([]);
    }
  }, [searchFraisTerm, frais]);

  const handleSelectEleve = (eleve) => {
    setSelectedEleve(eleve);
    setSearchTerm(`${eleve.Nom} ${eleve.Prenom}`);
    setFilteredEleves([]);
  };

  const handleClearSelection = () => {
    setSelectedEleve(null);
    setSearchTerm("");
  };

  const handleDeleteFrais = (index) => {
    const fraisToDelete = selectedFrais[index];
    const updatedSelectedFrais = selectedFrais.filter((_, i) => i !== index);
    setSelectedFrais(updatedSelectedFrais);
    setTotalMontant(totalMontant - fraisToDelete.Montant);
  };

const handleSelectFrais = (fraisItem) => {
  handleAddFrais(fraisItem.Description, fraisItem.Montant, fraisItem.ID_Frais);
  setSearchFraisTerm("");
  setFilteredFrais([]);
};

 const handleAddFrais = (
   description = newFraisDescription,
   montant = newFraisMontant,
   id = null
 ) => {
   const fraisToAdd = {
     Description: description,
     Montant: parseFloat(montant) || 0,
     ID_Frais: id, // Store the ID_Frais
   };
   setSelectedFrais([...selectedFrais, fraisToAdd]);
   setTotalMontant(totalMontant + fraisToAdd.Montant);
   setNewFraisDescription("");
   setNewFraisMontant("");
 };

 const handleSaveFacture = async () => {
   if (!selectedEleve) {
     alert("Veuillez choisir un élève.");
     return;
   }

   // Generate the comma-separated string of IDs
   const fraisIdsString = selectedFrais
     .map((f) => f.ID_Frais)
     .filter(Boolean)
     .join(",");

   // Construct the facture object
   const newFacture = {
     ID_Eleve: selectedEleve.ID_Eleve,
     Montant_Total: totalMontant,
     FraisIds: fraisIdsString,
     Numero_Facture: invoiceNumber,
     // Add other necessary fields from the Facture model
   };
   console.log(selectedFrais);
   await ajouterFacture(newFacture);
   resetForm();
 };


const resetForm = () => {
  // Reset all state variables
  setSearchTerm("");
  setFilteredEleves([]);
  setSelectedEleve(null);
  setSelectedFrais([]);
  setTotalMontant(0);
  setNewFraisDescription("");
  setNewFraisMontant("");
  setSearchFraisTerm("");
  setFilteredFrais([]);
  setInvoiceNumber(""); // Reset the invoice number
};


  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-2xl font-bold text-orange-500 mb-8">
        Generer une facture
      </h4>
      {invoiceNumber && <span>#{invoiceNumber} </span>}
      <p className="mt-4 font-bold text-right text-red-500 text-2xl">
        Total: {totalMontant}€
      </p>
      <div className="flex items-center gap-4 capitalize relative w-fit">
        <p className="font-bold">élève:</p>{" "}
        <input
          type="text"
          name="search"
          placeholder="Chercher eleve"
          className="block p-2 bg-orange-100 rounded-md focus:ring-1 focus:ring-orange-500 w-52 "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setSelectedEleve(null)}
        />
        {selectedEleve && (
          <div>
            <button
              className="mt-2 px-4 py-2 text-red-500 text-2xl rounded-full"
              onClick={handleClearSelection}
            >
              <FaRegTimesCircle />
            </button>
          </div>
        )}
        {filteredEleves.length > 0 && !selectedEleve && (
          <ul className="list-none border border-orange-400 rounded-md   absolute top-12 right-0 w-52 bg-slate-100">
            {filteredEleves.map((eleve) => (
              <li
                key={eleve.ID_Eleve}
                className="p-2 cursor-pointer hover:bg-orange-100 rounded-md border-b-1 border-b-slate-300"
                onClick={() => handleSelectEleve(eleve)}
              >
                {`${eleve.Nom} ${eleve.Prenom}`}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedEleve && (
        <div className="">
          <p>
            <span className="font-bold">Classe:</span>{" "}
            {selectedEleve.classe.Nom_Classe} -{selectedEleve.classe.Filiere}{" "}
          </p>
        </div>
      )}

      <div>
        <div className="flex justify-between">
          <h4 className="text-lg font-semibold text-orange-400 mt-4">Frais</h4>
          <div className="relative">
            <input
              type="text"
              placeholder="Description du frais"
              value={searchFraisTerm}
              onChange={(e) => setSearchFraisTerm(e.target.value)}
              className="p-2 bg-slate-100 rounded-md focus:ring-1 focus:ring-orange-500 mr-2"
            />
            {filteredFrais.length > 0 && (
              <ul className="list-none border border-orange-400 rounded-md absolute top-12 right-0 w-52 bg-slate-100">
                {filteredFrais.map((fraisItem) => (
                  <li
                    key={fraisItem.ID_Frais}
                    className="p-2 cursor-pointer hover:bg-orange-100 rounded-md border-b-1 border-b-slate-300"
                    onClick={() => handleSelectFrais(fraisItem)}
                  >
                    {fraisItem.Description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <table className="mt-1 table-auto w-full border-collapse border border-orange-300 rounded-tl-md rounded-tr-md">
          <thead>
            <tr className="bg-orange-300 text-slate-700 font-bold rounded-tl-md rounded-tr-md text-left">
              <th>Description</th>
              <th>Montant</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-300">
            {selectedFrais.map((frais, index) => (
              <tr key={index}>
                <td>{frais.Description}</td>
                <td>{frais.Montant}€</td>
                <td>
                  <button onClick={() => handleDeleteFrais(index)}>
                    <FaTrash className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleSaveFacture}
        className="py-2 px-4 border bg-green-600 rounded-md text-white"
      >
        Enrregistrer
      </button>
    </div>
  );
};

export default FactureForm;
