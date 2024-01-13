import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack } from "@mui/system";
import { Typography } from "@mui/material";

import { InternshipContainer, ClusterMap } from "../components";
import { resetBodyStyle } from "../utils";
import { useHomeLayoutContext } from "./HomeLayout";
import { SearchBox } from "../components/FormComponents";
import Wrapper from "../css/AllInternships.js";
import {
  Bar,
  Doughnut,
  LineStacked,
  Radar,
} from "../components/ChartComponents";

const statisticQuery = (params) => {
  return {
    queryKey: ["AllInternship"],
    queryFn: async () => {
      let requestData = await customFetch.get("statistics");
      return requestData.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    await queryClient.ensureQueryData(statisticQuery());
    return null;
  };

export default function Stats() {
  const data = useQuery(statisticQuery()).data;
  console.log(data);
  return (
    <Stack direction="column" alignItems="center">
      <Radar data={data.radar} />
      <Bar data={data.bar} />
      <Doughnut data={data.doughnut} />
      <LineStacked data={data.line} />
    </Stack>
  );
}
