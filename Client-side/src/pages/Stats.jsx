import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { useTheme } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import customFetch from "../utils/customFetch";

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
  const theme = useTheme();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack direction="column" alignItems="center">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width:"100%", display:"flex", justifyContent:"center" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Radar" value="1" />
            <Tab label="Bar" value="2" />
            <Tab label="LineStacked" value="3" />
            <Tab label="Doughnut" value="4" />
          </TabList>
        </Box>
        <TabPanel sx={{width:"70%"}} value="1">
          <Radar data={data.radar} theme={theme} />
        </TabPanel>
        <TabPanel sx={{width:"100%"}} value="2">
          <Bar data={data.bar} theme={theme} />
        </TabPanel>
        <TabPanel sx={{width:"100%"}} value="3">
          <LineStacked data={data.line} theme={theme} />
        </TabPanel>
        <TabPanel sx={{width:"100%", display:"flex", justifyContent:"center"}}  value="4">
          <Doughnut data={data.doughnut} theme={theme} />{" "}
        </TabPanel>
      </TabContext>
    </Stack>
  );
}
