import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Chart } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import "chartjs-plugin-datalabels";

// Chart.register(ChartDataLabels);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const ChartComponent = () => {
  return (
    <Bar
      data={{
        labels: ["Tata Motors", "Zoho", "TCS", "Infosys", "Wipro"],
        datasets: [
          {
            label: "Skills Required by Org",
            data: [65, 59, 80, 81, 56],
            backgroundColor: ["rgba(215, 215, 217, 1)"],
            borderRadius: 5,
          },
          {
            label: "Skills Acquired by Students",
            data: [55, 69, 78, 83, 56],
            backgroundColor: ["rgba(43, 102, 246, 1)"],
            borderRadius: 5,
          },
        ],
      }}
      options={{
        scales: {
          x: {
            beginAtZero: true,

            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
        },

        plugins: {
          datalabels: {
            anchor: "end",
            align: "top",
            formatter: Math.round,
            font: {
              weight: "bold",
            },
          },
          legend: {
            display: true,
            position: "top",
            align: "end",
            labels: {
              textAlign: "center",
            },
          },
          title: {
            display: true,
            text: "Skill Analysis",
            font: {
              size: 20,
              weight: "bold",
            },
            position: "top",
            align: "start",
          },
        },
      }}
    />
  );
};

export default ChartComponent;
