import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  return <Pie data={data} />;
};

export default PieChart;