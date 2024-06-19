"use client"
import { useRouter } from "next/router";
import React from "react";

const page = ({ id }) => {
  const router = useRouter()
  return <div>page: {router.query.id}  </div>;
};

export default page;
