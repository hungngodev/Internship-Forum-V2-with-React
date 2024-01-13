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

export default function LineChart({ data }) {
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
        text: (ctx) => "Line Chart based on Months of this Forum",
        color: "#00ff9f",
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
        mode: "index",
        callbacks: {
          label: (tooltipItem, data) => {
            console.log(tooltipItem);
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
        borderColor: "#fff",
        backgroundColor: "#36a2eb",
        fill: true,
      },
      {
        label: "Average Salary",
        data: linesalary,
        borderColor: "#fff",
        backgroundColor: "#ff6484",

        fill: true,
      },
      {
        label: "Average Rating",
        data: linerating,
        borderColor: "#fff",
        backgroundColor: "#4bc0c0 ",
        fill: true,
      },
      {
        label: "Best Month to Apply ranking",
        data: monthsrating,
        borderColor: "#fff",
        backgroundColor: "#ffcd56",
        fill: true,
      },
    ],
  };
  return <Line options={options} data={LineData} />;
}
