import React from "react";
import PaiementForm from "../../../components/PaiementForm";
import { getFactures } from "../../../../actions/facturesActions";

const page = async () => {
  const factures = await getFactures();
  return (
    <div className="m-8">
      <h4 className="text-orange-500 font-bold text-xl">Payer un reçu</h4>
      <PaiementForm factures={factures} />
    </div>
  );
};

export default page;
