"use client";
import React from "react";
import { approuvePaiement } from "../../actions/paymentsActions";
import { useRouter } from "next/navigation";

const Approuve = ({ id }) => {
  const router = useRouter();
  const handleAprouve = async () => {
    console.log(id);
    await approuvePaiement(id);
    // router.refresh();
  };
  return (
    <button onClick={handleAprouve} className="text-green-700">
      Approuver
    </button>
  );
};

export default Approuve;
