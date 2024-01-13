import React from "react";
import { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementsAtEvent } from "react-chartjs-2";
import "chart.js/auto";
import { defaults } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ data, }) {
  const chartRef = useRef();
  const [width, setWidth] = React.useState(0);
  const onClick = (event) => {
  };
  const options = {
    aspectRatio: function (context) {
      var width = context.chart.width;
      if (width > 800) {
        return 2;
      }
      if (width < 800 && width > 400) {
        return 1.5;
      }
      if (width < 400) {
        return 1;
      }
    },
    onResize : function (chart, size) {
        var width = size.width;
        var Fontsize = Math.round(width / 60);
        defaults.font.size = Fontsize;
    },
    scales: {
      x: {
        grid: {
          tickColor: "#FF79C6",
        },
        ticks: {
          color: "#8BE9FD",
          font: {
            family: "Georgia, serif",
          },
        },
        title: {
          display: true,
          color: "#00ff9f",
          font: function (context) {
            var width = context.chart.width;
            var size = Math.round(width / 32);
            return {
              size: 0.7 * size,
              weight: "bold",
            };
          },
          text: "States in the US",
        },
      },
      y: {
        grid: {
          tickColor: "#FF79C6",
        },
        ticks: {
          color: "#8BE9FD",
          font: {
            family: "Georgia, serif",
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#F8F8F2",
          font: {
            family: "Georgia, serif",
          },
        },
      },
      title: {
        display: true,
        color: "#00ff9f",
        text: "Combo Bar Line Chart of this Forum",
        font: function (context) {
          var width = context.chart.width;
          var size = Math.round(width / 32);
          return {
            size: size,
            weight: "bold",
          };
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem, data) => {
            if (tooltipItem.datasetIndex === 2) {
              return (
                tooltipItem.dataset.label +
                ": " +
                (tooltipItem.raw / 5).toFixed(1)
              );
            } else if (tooltipItem.datasetIndex === 0) {
              return (
                tooltipItem.dataset.label +
                ": " +
                "$" +
                tooltipItem.raw.toFixed(1) +
                "/hr"
              );
            }
          },
        },
      },
    },
    animations: {
      tension: {
        duration: 2000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
      onProgress: function (animation) {
        progress.value = animation.currentStep / animation.numSteps;
      },
    },
  };

  const Bardata = {
    labels: data.keys,
    datasets: [
      {
        label: "Average Salary",
        data: data.averagesalary,
      },
      {
        label: "Number of Internships",
        data: data.counts,
      },
      {
        label: "Average Rating",
        data: data.averageReview,
        type: "line",
        order: 0,
      },
    ],
  };
  return (
    <Bar
      ref={chartRef}
      onClick={onClick}
      options={options}
      data={Bardata}
    />
  );
}
