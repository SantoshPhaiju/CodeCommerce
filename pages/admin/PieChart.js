import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ chartData }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-firasans font-bold text-center text-pink-800">
        Users Status
      </h2>

      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
