import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import "chart.js/auto";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import Chip from "@mui/material/Chip";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { toast } from "react-toastify";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart({ data }) {
  const companies = data.keys;
  const fixedoptions = [];
  const [value, setValue] = React.useState([companies[0], companies[1]]);
  const companyData = data.result;
  const company1 = "Apple";
  const company2 = "Microsoft";
  const company3 = "Adobe";
  const rainbowColors = [
    {
      backgroundColor: "rgba(131, 56, 236, 0.4)",
      borderColor: "rgb(131, 56, 236)",
      pointColor: "rgb(131, 56, 236)",
    },
    {
    
      backgroundColor: "rgba(255, 0, 110,0.4)",
      borderColor: "rgb(255, 0, 110)",
      pointColor: "rgb(255, 255, 255)",
    },
    {
    
      backgroundColor: "rgba(46, 196, 182,0.4)",
      borderColor: "rgb(46, 196, 182)",
      pointColor: "rgb(0, 0, 0)",
    },
    {
      backgroundColor: "rgba(255, 190, 11,0.4)",
      borderColor: "rgb(255, 190, 11)",
      pointColor: "rgb(255, 255, 255)",
    },
    {
      backgroundColor: "rgba(124, 181, 24,0.4)",
      borderColor: "rgb(124, 181, 24)",
      pointColor: "rgb(255, 255, 255)",
    },
    {

      backgroundColor: "rgba(244,139,144,0.4)",
      borderColor: "rgb(244,139,144)",
      pointColor: "rgb(255, 255, 255)",
    },
    {
    
      backgroundColor: "rgba(1,101,252,0.4)",
      borderColor: "rgb(1,101,252)",
      pointColor: "rgb(255, 255, 255)",
    },
  ];

  const RadarData = {
    labels: ["Number of Internships ", "Average Salary", "Average Rating "],
    datasets: value.map((company, index) => ({
      label: company,
      data: [
        companyData[company].count * 10,
        companyData[company].averageSalary,
        companyData[company].averageRating * 10,
      ],
      fill: true,
      backgroundColor: rainbowColors[index].backgroundColor,
      borderColor: rainbowColors[index].borderColor,
      pointBackgroundColor: rainbowColors[index].borderColor,
      pointHoverBorderColor: "#000",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointRadius: 10,
    })),
  };
  const options = {
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    scales: {
      r: {
        pointLabels: {
          color: "#8BE9FD",
          font: function (context) {
            var width = context.chart.width;
            var size = Math.round(width / 32);
            return {
              size: 0.8 * size,
              family: "Georgia, serif",
            };
          },
        },
        angleLines: {
          color: "#50FA7B",
        },
        ticks: {

          color: "#f9da42",
          backdropColor: "#000",
        },
      },
    },
    aspectRatio: 1.2,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: " end",
        padding: 100,
        labels: {
          color: "#F8F8F2",
          font: function (context) {
            var width = context.chart.width;
            var size = Math.round(width / 32);
            return {
              size: 0.8 * size,
              family: "Georgia, serif",
            };
          },
        },
      },
      title: {
        display: true,
        text: "Comparison of two Companies",
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
      tooltip: {
        callbacks: {
          label: (tooltipItem, data) => {
            if (tooltipItem.dataIndex === 1) {
              return (
                tooltipItem.dataset.label +
                ": " +
                "$" +
                tooltipItem.raw.toFixed(1) +
                "/hr"
              );
            } else if (tooltipItem.dataIndex === 0) {
              return (
                tooltipItem.dataset.label +
                ":" +
                (tooltipItem.raw / 10).toFixed(1)
              );
            } else if (tooltipItem.dataIndex === 2) {
              return (
                tooltipItem.dataset.label +
                ":" +
                (tooltipItem.raw / 10).toFixed(1)
              );
            }
          },
        },
      },
    },
  };
  return (
    <>
      <Autocomplete
        fullWidth={true}
        autoComplete={true}
        autoSelect={true}
        blurOnSelect="mouse"
        clearOnEscape={true}
        multiple
        id="fixed-tags-demo"
        value={value}
        onChange={(event, newValue) => {
            if (newValue.length >7){
                toast.error("Please select only 7 companies");
                return;
            }
          setValue(newValue);
        }}
        options={companies}
        getOptionLabel={(option) => option}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Comparing Companies"
            placeholder="Companies"
          />
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option, inputValue, {
            insideWords: true,
          });
          const parts = parse(option, matches);

          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
      <Radar data={RadarData} options={options} />
    </>
  );
}
