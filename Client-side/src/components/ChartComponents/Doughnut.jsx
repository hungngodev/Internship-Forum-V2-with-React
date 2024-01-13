import "chart.js/auto";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ data }) {
  const backgroundColor1 = [
    "rgb(255, 0, 0)", // Red
    "rgb(255, 3, 33)",
    "rgb(255, 101, 0)",
    "rgb(255, 156, 0)",
    "rgb(255, 205, 0)",
    "rgb(237, 251, 12)",
    "rgb(202, 250, 110)",
    "rgb(130, 234, 127)",
    "rgb(31, 214, 146)",
    "rgb(0, 192, 163)",
    "rgb(0, 168, 174)",
    "rgb(0, 143, 175)",
    "rgb(0, 117, 166)",
    "rgb(0, 91, 147)",
    "rgb(8, 66, 120)",
    "rgb(42, 42, 88)",
    "rgb(0, 255, 204)", // Green-Cyan
    "rgb(0, 255, 255)", // Cyan
    "rgb(0, 204, 255)", // Cyan
    "rgb(0, 153, 255)", // Cyan-Blue
    "rgb(0, 102, 255)", // Cyan-Blue
    "rgb(0, 51, 255)", // Blue-Cyan
    "rgb(0, 0, 255)", // Blue-Cyan
    "rgb(51, 0, 255)", // Blue-Magenta
    "rgb(102, 0, 255)", // Blue-Magenta
    "rgb(153, 0, 255)", // Magenta
    "rgb(204, 0, 255)", // Magenta
    "rgb(255, 0, 255)", // Magenta-Red
    "rgb(250, 110, 212)",
    "rgb(216, 112, 212)",
    "rgb(182, 112, 207)",
    "rgb(149, 111, 198)",
    "rgb(119, 107, 185)",
    "rgb(92, 102, 169)",
    "rgb(70, 96, 150)",
    "rgb(54, 88, 130)",
    "rgb(45, 79, 109)",
    "rgb(42, 69, 88)",
  ];
  const label = data.labels1;
  const Doughnutdata = {
    labels: label,
    datasets: [
      {
        label: "Number of Internships",
        data: data.data1,
        backgroundColor: backgroundColor1,
      },
    ],
  };
  const centerText = {
    id: "centerText",
    afterDatasetsDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { left, right, top, bottom, width, height },
      } = chart;
      ctx.save();
      const number = data.data1.length;
      ctx.textAlign = "center";
      ctx.fillStyle = "#00ff9f";

      let size = Math.round(width / 32);

      ctx.font = `bold ${0.4 * size + 12}px Arial`;
      ctx.fillText("#Internships: " + number, width / 2, height / 2 + top);
      ctx.restore();
    },
  };
  const options = {
    aspectRatio: function (context) {
        var width = context.chart.width;
        if (width > 800) {
            return 1.5
        }
        if (width <800 && width > 400) {
            return 1.3
        }
        if (width < 400) {
            return 1
        }
    },
    plugins: {
      legend: {
        display: function (context) {
          var width = context.chart.width;
          if (width > 480) {
            return true;
          } else return false;
        },
        position: "top",
        align: " end",
        padding: 100,
        labels: {
          color: "#F8F8F2",
          font: function (context) {
            var width = context.chart.width;
            var size = Math.round(width / 35);
            return {
              size: 0.4 * size,
            };
          },
        },
      },
      title: {
        display: true,
        text: "Doughnut Chart of this Forum",
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
      deferred: {
        xOffset: 150, // defer until 150px of the canvas width are inside the viewport
        yOffset: "50%", // defer until 50% of the canvas height are inside the viewport
        delay: 2000, // delay of 500 ms after the canvas is considered inside the viewport
      },
    },
  };

  return <Doughnut options={options} plugins={[centerText]} data={Doughnutdata} />;
}
