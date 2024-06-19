"use client";
import { useRouter } from "next/router";
import React from "react";

const PaiementPage = () => {
  const router = useRouter();
  return <div>page: {router.query.id} </div>;
};

export default PaiementPage;
