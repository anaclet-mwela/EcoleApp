"use client";
import Link from "next/link";
import React from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Pagination = () => {
  return (
    <div className="flex justify-between items-center mt-1 bg-orange-400 px-4 py-2 rounded-b-md">
      <Link
        href={""}
        className="py-1 px-4 flex gap-4 items-center bg-orange-700 hover:bg-orange-600 text-white rounded-md"
      >
        <FaArrowCircleLeft /> Prev
      </Link>
      <Link
        href={`/admin/eleves/`}
        className="py-1 px-4 flex gap-4 items-center bg-orange-700 hover:bg-orange-600 text-white rounded-md"
      >
        Suivant <FaArrowCircleRight />
      </Link>
    </div>
  );
};

export default Pagination;
