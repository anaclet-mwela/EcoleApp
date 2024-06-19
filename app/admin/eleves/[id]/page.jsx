import React from "react";
import { fetchClasses } from "../../../../actions/classesActions";
import { getEleve, modifierEleve } from "../../../../actions/elevesActions";
import moment from "moment";
import { redirect } from "next/navigation";

const FormEleve = async ({ params }) => {
  const { id } = params;

  const eleve = await getEleve(id);
  const classes = await fetchClasses();

  const handleSubmit = async (formData) => {
    "use server";
    await modifierEleve(formData, id);

    await redirect("/admin/eleves");
  };

  const formattedEleve = {
    ...eleve,
    Date_Naissance: moment(eleve.Date_Naissance).format("YYYY-MM-DD"),
  };

  return (
    <div className="p-16 text-slate-700">
      <div className="max-w-7xl">
        <h1 className="text-orange-600 font-bold text-2xl mb-16 text-center">
          Inscrire Elève
        </h1>
        <form action={handleSubmit}>
          <div className="flex gap-16">
            {/* Left side */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 items-center">
                <div className="border border-orange-400 w-52 aspect-square rounded-md"></div>
                <p className="text-center">
                  Photo de {formattedEleve.Prenom} {formattedEleve.Nom}
                </p>
              </div>

              <div className="flex gap-8 items-center">
                <label htmlFor="classe" className="w-1/3 text-right">
                  Classe
                </label>
                <select
                  name="ID_Classe"
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                  defaultValue={formattedEleve.classe.ID_Classe}
                >
                  <option value={formattedEleve.classe.ID_Classe}>
                    {formattedEleve.classe.Nom_Classe}
                  </option>
                  {classes.map((classe) => (
                    <option value={classe.ID_Classe} key={classe.ID_Classe}>
                      {classe.Nom_Classe}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-8 justify-between mt-16">
                <button
                  type="reset"
                  className="py-2 px-4 border border-orange-600 text-orange-700 rounded-md hover:bg-orange-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-500"
                >
                  Modifier
                </button>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex gap-8 items-center">
                <label htmlFor="Nom" className="w-1/3 text-right">
                  Nom:
                </label>
                <input
                  type="text"
                  name="Nom"
                  defaultValue={formattedEleve.Nom}
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                />
              </div>
              <div className="flex gap-8 items-center">
                <label htmlFor="Prenom" className="w-1/3 text-right">
                  Prénom:
                </label>
                <input
                  type="text"
                  name="Prenom"
                  defaultValue={formattedEleve.Prenom}
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                />
              </div>
              <div className="flex gap-8 items-center">
                <label htmlFor="Date_Naissance" className="w-1/3 text-right">
                  Date de naissance:
                </label>
                <input
                  type="date"
                  name="Date_Naissance"
                  defaultValue={formattedEleve.Date_Naissance}
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                />
              </div>
              <div className="flex gap-8 items-center">
                <label htmlFor="Sexe" className="w-1/3 text-right">
                  Sexe
                </label>
                <select
                  name="Sexe"
                  defaultValue={formattedEleve.Sexe}
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                >
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
                  defaultValue={formattedEleve.Numero_Telephone}
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                />
              </div>
              <div className="flex gap-8 items-center">
                <label htmlFor="Adresse" className="w-1/3 text-right">
                  Adresse:
                </label>
                <input
                  type="text"
                  name="Adresse"
                  defaultValue={formattedEleve.Adresse}
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                />
              </div>
              <div className="flex gap-8 items-center">
                <label htmlFor="Adresse_Email" className="w-1/3 text-right">
                  E-mail:
                </label>
                <input
                  type="email"
                  name="Adresse_Email"
                  defaultValue={formattedEleve.Adresse_Email}
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                />
              </div>
              <div className="flex gap-8 items-center">
                <label htmlFor="Parent_Tuteur" className="w-1/3 text-right">
                  Parent/Tuteur:
                </label>
                <input
                  type="text"
                  name="Parent_Tuteur"
                  defaultValue={formattedEleve.Parent_Tuteur}
                  className="rounded-md p-2 bg-orange-200 block flex-1 focus:border-orange-600 border"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEleve;
