import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const BarChart = ({ chartData }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-firasans font-bold text-center text-pink-800">
        Users Status
      </h2>

      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
