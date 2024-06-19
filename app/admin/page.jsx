import React from "react";
import {
  FaChartPie,
  FaFileInvoiceDollar,
  FaSchool,
  FaUsers,
} from "react-icons/fa";
import { getSession } from "../../actions/authActions";
import { redirect } from "next/navigation";

import ChartStat from "../components/ChartStat"
import LatestPaiements from "../components/LatestPaiements";

import { boysCount, classtCount, girlsCount, paiedFactureCount, studentCount, totalAll, totalPaid,  } from "../../actions/stats";

const Home = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  const totalStudents = await studentCount();
  const filles = await girlsCount();
  const garcons = await boysCount();

  const totalClass = await classtCount();
  const unpaid = await paiedFactureCount("Non paye")
  const paid = await paiedFactureCount("Paye")
  const totalNonPaye = await totalPaid("Non paye");
  const totalGeneral = await totalAll();

  return (
    <div className="m-8">
      <div className="grid grid-cols-4 gap-8">
        {/* card */}
        <div className="bg-white rounded-lg p-4 flex gap-4 items-center">
          <FaUsers className="text-8xl text-orange-300" />
          <div className="flex flex-col justify-evenly">
            <p className="uppercase text-slate-500">élèves</p>
            <p className="font-bold text-4xl text-slate-700">{totalStudents}</p>
            <div className="flex items-center text-slate-500">
              <p>{filles} Filles</p> -
              <p>
                {garcons} {garcons > 1 ? "Garçons" : "Garçon"}{" "}
              </p>
            </div>
          </div>
        </div>
        {/* Classes Card */}
        <div className="bg-white rounded-lg p-4 flex gap-4 items-center">
          <FaSchool className="text-8xl text-blue-300" />
          <div className="flex flex-col justify-evenly text-slate-500">
            <p className="uppercase">classes</p>

            <p className="flex gap-4 items-end mt-4">
              <span className="font-bold text-4xl text-slate-700">
                {totalClass}
              </span>{" "}
              3 Fillières
            </p>
            <div className="flex items-center"></div>
          </div>
        </div>
        {/* Facture Card */}
        <div className="bg-white rounded-lg p-4 flex gap-4 items-center">
          <FaFileInvoiceDollar className="text-8xl text-red-300" />
          <div className="flex flex-col justify-evenly text-slate-500">
            <p className="uppercase"> {unpaid} Factures non payés</p>

            <p className="flex gap-4 items-end mt-4 text-xl">
              CDF
              <span className="font-bold text-4xl text-slate-700">
                {totalNonPaye}
              </span>
            </p>
            <div className="flex items-center"></div>
          </div>
        </div>
        {/* Facture Card */}
        <div className="bg-white rounded-lg p-4 flex gap-4 items-center">
          <FaChartPie className="text-8xl text-green-300" />
          <div className="flex flex-col justify-around text-slate-500">
            <p className="uppercase">Révenues</p>
            <p className="flex gap-4 items-end mt-4 text-xl">
              CDF
              <span className="font-bold text-4xl text-slate-700">
                {totalGeneral}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="mt-8 bg-white p-6 rounded-md">
          <h4 className="font-bold text-orange-600 text-xl mb-6">
            Récapitulatif Mensuel
          </h4>
          <ChartStat />
        </div>
        <div className="mt-8 bg-white p-6 rounded-md">
          <h4 className="font-bold text-orange-600 text-xl mb-6">
            Dérnières Transactions
          </h4>
          <LatestPaiements />
        </div>
      </div>
    </div>
  );
};

export default Home;
