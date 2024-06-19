"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter } from "react-icons/fa";

const PaiementFilter = () => {
  const [order, setOrder] = useState("asc");
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleFilter = (e) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      params.set("f", e.target.value);
    } else {
      params.delete("f");
    }
    replace(`${pathName}?${params}`);
  };



  return (
    <div className="flex items-center text-orange-700 gap-4">
      <select
        className="font-medium px-8 py-2 rounded-md bg-orange-200"
        onChange={handleFilter}
      >
        <option>Tout</option>
        <option value="false">En attente</option>
        <option value="true">Aprouvé</option>
      </select>
     
    </div>
  );
};

export default PaiementFilter;
