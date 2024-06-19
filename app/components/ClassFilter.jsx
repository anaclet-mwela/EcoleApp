"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter } from "react-icons/fa";

const ClassFilter = () => {
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

  const handleOrder = () => {
    order == "asc" ? setOrder("desc") : setOrder("asc");
    const params = new URLSearchParams(searchParams);

    if (order) {
      params.set("o", order);
    } else {
      params.delete("o");
    }
    replace(`${pathName}?${params}`);
  };

  return (
    <div className="flex items-center text-orange-700 gap-4">
      <select
        className="font-medium px-8 py-2 rounded-md bg-orange-200"
        onChange={handleFilter}
      >
        <option value="Nom">Nom</option>
        <option value="Niveau">Niveau</option>
        <option value="Filière">Filière</option>
      </select>
      <button
        className="border border-orange-700 p-2 rounded-md hover:bg-orange-300 transition ease-linear"
        onClick={handleOrder}
      >
        <FaFilter />
      </button>
    </div>
  );
};

export default ClassFilter;
