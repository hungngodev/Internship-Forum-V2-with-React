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

export default function BarChart({ data ,theme, titleSize, tickSize, labelSize }) {
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
    responsive: true,
    scales: {
      x: {
        grid: {
          tickColor: theme.palette.info.main,
        },
        ticks: {
          color: theme.palette.error.main,
          font: function (context) {
            var width = context.chart.width;
            var size = Math.round(width / 35);
            return {
              size: tickSize * size,
              family: "Georgia, serif",
            };
          },
        },
        title: {
          display: true,
          color: theme.palette.secondary.main,
          font: function (context) {
            var width = context.chart.width;
            var size = Math.round(width / 35);
            return {
              size: labelSize * size,
              weight: "bold",
            };
          },
          text: "States in the US",
        },
      },
      y: {
        grid: {
          tickColor: theme.palette.info.main,
        },
        ticks: {
          color: theme.palette.error.main,
          font: function (context) {
            var width = context.chart.width;
            var size = Math.round(width / 35);
            return {
              size: tickSize * size,
              family: "Georgia, serif",
            };
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: theme.palette.third.main,
          font: function (context) {
            var width = context.chart.width;
            var size = Math.round(width / 35);
            return {
              size: labelSize * size,
              family: "Georgia, serif",
            };
          },
        },
      },
      title: {
        display: true,
        color: theme.palette.primary.main,
        text: "Combo Bar Line Chart of this Forum",
        font: function (context) {
          var width = context.chart.width;
          var size = Math.round(width / 35);
          return {
            size: titleSize* size,
            weight: "bold",
          };
        },
      },
      tooltip: {
        titleColor: theme.palette.error.main,
        bodyColor: theme.palette.text.primary,
        borderColor: theme.palette.success.main,
        borderWidth:1,
        backgroundColor: "rgba(0,0,0,0)",
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
        backgroundColor: `rgba(${theme.palette.barColor.main},1)`,
        borderColor: theme.palette.text.primary,
        borderWidth:1,
      },
      {
        label: "Number of Internships",
        data: data.counts,
        backgroundColor: `rgba(${theme.palette.barColor.light},1)`,
        borderColor: theme.palette.text.primary,
        borderWidth:1,
      },
      {
        label: "Average Rating",
        data: data.averageReview,
        type: "line",

        borderColor: `rgba(${theme.palette.barColor.dark},1)`,
        order: 0,
        borderWidth:2,
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
