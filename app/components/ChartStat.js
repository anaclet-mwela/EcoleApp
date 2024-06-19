"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { getFactureSummary } from "../../actions/stats";

const ChartStat = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFactureSummary = async () => {
      try {
        const { unpaidFactures, paidFactures } = await getFactureSummary();

        const monthlyData = Array.from({ length: 12 }, (_, i) => ({
          month: new Date(0, i).toLocaleString("default", { month: "short" }),
          paid: 0,
          unpaid: 0,
        }));

        unpaidFactures.forEach(({ Date_Emission, _sum: { Montant_Total } }) => {
          const month = new Date(Date_Emission).getMonth();
          monthlyData[month].unpaid += Montant_Total;
        });

        paidFactures.forEach(({ Date_Emission, _sum: { Montant_Total } }) => {
          const month = new Date(Date_Emission).getMonth();
          monthlyData[month].paid += Montant_Total;
        });

        setData(monthlyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFactureSummary();
  }, []);

  return (
    <div className="h-64">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="paid" stroke="#82ca9d" />
          <Line type="monotone" dataKey="unpaid" stroke="#880000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartStat;
