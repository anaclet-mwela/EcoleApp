"use client";
import React from "react";
import Link from "next/link";
import {
  FaCoffee,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaMoneyBillAlt,
  FaPencilAlt,
  FaSchool,
  FaUser,
  FaUsers,
  FaWindows,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  console.log(pathname);

  const menu = [
    {
      titre: "Acceuil",
      icon: <FaWindows />,
      link: "/admin",
    },
    {
      titre: "Elèves",
      icon: <FaUser />,
      link: "/admin/eleves",
    },
    {
      titre: "Classes",
      icon: <FaSchool />,
      link: "/admin/classes",
    },
    {
      titre: "Facture",
      icon: <FaFileInvoiceDollar />,
      link: "/admin/factures",
    },
    {
      titre: "Paiements",
      icon: <FaMoneyBillAlt />,
      link: "/admin/payments",
    },
    {
      titre: "Administrateurs",
      icon: <FaCoffee />,
      link: "/admin/users",
    },
  ];
  return (
    <div className="w-[200px] p-4 h-screen bg-orange-500">
      <div>
        <h4 className="font-bold text-white uppercase text-2xl text-center mb-2">
          CS Daniella
        </h4>
        <div className="w-[50px] mx-auto h-[5px] bg-orange-300" />
      </div>
      <div className="text-white mt-8 flex flex-col gap-4">
        {menu.map((menu, index) => (
          <Link
            href={menu.link}
            key={index}
            className={`flex items-center gap-4  hover:bg-orange-300 px-4 py-2 rounded-md ${
              pathname.startsWith(menu.link) ? "bg-orange-300" : "bg-orange-400"
            }`}
          >
            {" "}
            {menu.icon} {menu.titre}{" "}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
