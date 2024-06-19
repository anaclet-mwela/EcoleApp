"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback( (e) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathName}?${params}`);
  }, 300);
  return (
    <div className="flex items-center gap-2 rounded-full py-1 px-2 bg-orange-200 text-orange-700">
      <FaSearch />
      <input
        type="text "
        className="rounded-full py-1 px-2 bg-orange-200 text-orange-700 ring-transparent"
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
