"use client";
import { FaEye, FaTimes } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import { supprimerEleve } from "../../actions/elevesActions";

const ActionButtons = ({ id }) => {
  const deleteEleve = async () => {
    await supprimerEleve(id);
    console.log(id)
  };
  return (
    <div className="flex items-center gap-4">
      <Link
        href={`/admin/eleves/${id}`}
        className="py-1 px-4 flex gap-4 items-center bg-orange-700 hover:bg-orange-600 text-white rounded-md"
      >
        <FaEye /> Voir
      </Link>
      <button
        onClick={deleteEleve}
        className=" py-1 px-4 flex gap-4 items-center bg-red-500 hover:bg-red-400 text-white rounded-md"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default ActionButtons;
