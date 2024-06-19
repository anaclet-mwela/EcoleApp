"use client";
import React from "react";
import { useState } from "react";
import { ajouterEleve } from "../../../../actions/elevesActions";

const Form = ({ classes }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

const handleSubmit = async () => {
 

  try {
    // Call the ajouterEleve function with the form data
    await ajouterEleve(formData);

    // Reset the form after successful submission
    setFormData({});

    // Optionally, you can add a success message or redirect the user
    console.log("Eleve added successfully");
    // Redirect logic can be added here if needed
  } catch (error) {
    console.error("Failed to add eleve:", error);
    // Optionally, handle the error or display an error message to the user
  }
};

  return (
    <div className="max-w-7xl">
      <h1 className="text-orange-600 font-bold text-2xl mb-16 text-center">
        Inscrire Elèveq
      </h1>
      <form action={handleSubmit} className="">
        <div className="grid grid-cols-2 gap-16">
          {/* Left side */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-8 items-center">
              <label htmlFor="Nom" className="w-1/3 text-right">
                Nom:
              </label>
              <input
                type="text"
                name="Nom"
                className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-8 items-center">
              <label htmlFor="Prenom" className="w-1/3 text-right">
                Prénom:
              </label>
              <input
                type="text"
                name="Prenom"
                className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-8 items-center">
              <label htmlFor="Date_Naissance" className="w-1/3 text-right">
                Date de naissance:
              </label>
              <input
                type="date"
                name="Date_Naissance"
                className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-8 items-center">
              <label htmlFor="Sexe" className="w-1/3 text-right">
                Sexe
              </label>
              <select
                name="Sexe"
                className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                onChange={handleChange}
              >
                <option selected desabled>
                  Selectionner un sexe
                </option>
                <option value="F">Fille</option>
                <option value="M">Garçon</option>
              </select>
            </div>
            <div className="flex gap-8 items-center">
              <label htmlFor="Numero_Telephone" className="w-1/3 text-right">
                Téléphone:
              </label>
              <input
                type="tel"
                name="Numero_Telephone"
                className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-8 items-center">
              <label htmlFor="Adresse" className="w-1/3 text-right">
                Adresse:
              </label>
              <input
                type="text"
                name="Adresse"
                className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-8 items-center">
              <label htmlFor="Adresse_Email" className="w-1/3 text-right">
                E-mail:
              </label>
              <input
                type="email"
                name="Adresse_Email"
                className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-8 items-center">
              <label htmlFor="Parent_Tuteur" className="w-1/3 text-right">
                Parent/Tuteur:
              </label>
              <input
                type="text"
                name="Parent_Tuteur"
                className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* right side */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-8 items-center">
              <p className="w-1/3 text-right">Photo</p>
              <div className="border border-orange-400 w-52 aspect-square rounded-md"></div>
            </div>

            <div className="flex gap-8 items-center">
              <label htmlFor="classe" className="w-1/3 text-right">
                Classe
              </label>
              <select
                name="Classe"
                className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                onChange={handleChange}
              >
                <option disabled selected>
                  Selectionner un classe
                </option>
                {classes.map((classe) => (
                  <option value={classe.Id_Classe} key={classe.Id_Classe}>
                    {classe.Nom_Classe}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-8 justify-end mt-8">
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
        </div>
      </form>
    </div>
  );
};

export default Form;
