import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ data, theme,titleSize, tickSize, labelSize}) {
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
        text: (ctx) => "Line Chart based on Months of this Forum",
        color: theme.palette.primary.main,
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
        titleColor: theme.palette.primary.main,
        bodyColor: theme.palette.text.primary,
        borderColor: theme.palette.success.main,
        borderWidth: 1,
        backgroundColor: "rgba(0,0,0,0)",
        mode: "index",
        callbacks: {
          label: (tooltipItem, data) => {
            if (tooltipItem.datsetaIndex === 0) {
              return (
                tooltipItem.dataset.label +
                ": " +
                (tooltipItem.raw / 4).toFixed(0)
              );
            } else if (tooltipItem.datasetIndex === 1) {
              return (
                tooltipItem.dataset.label +
                ": " +
                "$" +
                tooltipItem.raw.toFixed(1) +
                "/hr"
              );
            } else if (tooltipItem.datasetIndex === 2) {
              return (
                tooltipItem.dataset.label +
                ": " +
                (tooltipItem.raw / 10).toFixed(1)
              );
            } else if (tooltipItem.datasetIndex === 3) {
              return (
                tooltipItem.dataset.label +
                ": " +
                (tooltipItem.raw / 5).toFixed(0)
              );
            }
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
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
            var size = Math.round(width / 32);
            return {
              size: labelSize * size,
              weight: "bold",
            };
          },
          text: "Twelve Months of each year",
        },
      },
      y: {
        stacked: true,
        display: false,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const number = labels.map((month) => data[month].numberOfObjects * 4);
  const linesalary = labels.map((month) => data[month].averageSalary);
  const linerating = labels.map((month) => data[month].averageReview * 10);
  const basemonthsrating = [12, 9, 4, 3, 2, 1, 0, 6, 7, 11, 8, 5];
  const monthsrating = basemonthsrating.map((month) => month * 5);
  const LineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Number of Internships",
        data: number,
        borderColor: theme.palette.text.primary,
        backgroundColor: "#36a2eb",
        fill: true,
      },
      {
        label: "Average Salary",
        data: linesalary,
        borderColor: theme.palette.text.primary,
        backgroundColor: "#ff6484",

        fill: true,
      },
      {
        label: "Average Rating",
        data: linerating,
        borderColor: theme.palette.text.primary,
        backgroundColor: "#4bc0c0 ",
        fill: true,
      },
      {
        label: "Best Month to Apply ranking",
        data: monthsrating,
        borderColor: theme.palette.text.primary,
        backgroundColor: "#ffcd56",
        fill: true,
      },
    ],
  };
  return <Line options={options} data={LineData} />;
}
