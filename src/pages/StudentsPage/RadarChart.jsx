import React from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import { Radar } from "react-chartjs-2";
import plugin from "chartjs-plugin-datalabels";

const RadarChart = () => {
  const data = {
    labels: [
      "Business",
      "Marketing",
      "Finance",
      "Development",
      "Design",
      "Sales",
    ],
    datasets: [
      {
        data: [50, 54, 50, 51, 55, 53],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        data: [40, 40, 40, 40, 40, 40],
        fill: true,
        backgroundColor: "rgba(87,48,255,0.2)",
        borderColor: "#5730FF",
        pointBackgroundColor: "#5730FF",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#5730FF",
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: Math.round,
        font: {
          weight: "bold",
        },
      },
      legend: false,
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        ticks: {
          display: false,
        },

        suggestedMin: 30,
        suggestedMax: 70,
        pointLabels: {
          color: "#EB7C49",
        },
      },
    },
  };

  return <Radar className="tw-m-auto" options={options} data={data} />;
};

export default RadarChart;
