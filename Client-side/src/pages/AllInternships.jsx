import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";

import customFetch from "../utils/customFetch";
import { InternshipContainer, ClusterMap } from "../components";
import { SearchBox } from "../components/FormComponents";
import { useHomeLayoutContext } from "./HomeLayout";
import Font from "../utils/FontConfiguration";
import Wrapper from "../css/AllInternships";

const allInternshipsQuery = (params) => {
  let search = "";
  let sort = "lastModified";
  let option = false;
  let order = "desc";
  if (params) {
    search = params.search;
    sort = params.sort;
    option = params.option;
    order = params.order;
  }
  return {
    queryKey: ["AllInternship", search, sort, option, order],
    queryFn: params
      ? async () => {
          let requestData = await customFetch.get("/internships", { params });
          return requestData.data;
        }
      : () => {
          return { data: [] };
        },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const {data}= await customFetch.get("/e0dca1652c5245168699e24a57e3a8d8");
    const {b3c44b59965a12148f4e3a12757d4e2bc}=data;
    const defaultParams = {
      search: params.search ? params.search : "",
      sort: params.sort ? params.sort : "lastModified",
      option: params.option ? params.option : true,
      order: params.order ? params.order : "desc",
    };
    await queryClient.ensureQueryData(allInternshipsQuery());
    return { searchValues: { ...defaultParams }, c534293dc4f4fa6054da377839afcf408: b3c44b59965a12148f4e3a12757d4e2bc };
  };

const AllInternshipsContext = createContext();
const AllInternships = () => {
  const  data = useLoaderData();
  const {searchValues}=data;
  let internshipData = useQuery(allInternshipsQuery(searchValues)).data;
  return (
    <AllInternshipsContext.Provider value={{ internshipData, searchValues }}>
      <Grid
        container
        display="flex"
        alignItems="center"
        flexDirection="column"
        rowSpacing={4}
      >
        <Grid item xs={12} display="flex" justifyContent="center">
          <Wrapper>
            <ClusterMap
              internship={internshipData ? internshipData.internships : []}
              c9db5c7a7d7755f4560c3f9fae9968b1={data.c534293dc4f4fa6054da377839afcf408}
            />
          </Wrapper>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography
            variant="h2"
            color="primary"
            fontFamily={Font.title}
            sx={{ textAlign: "center" }}
          >
            All Internships of this Forum
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SearchBox searchValues={searchValues} />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          {internshipData && (
            <Typography
              variant="h3"
              color="secondary"
              fontFamily={Font.subtitle}
            >
              Found{" "}
              {internshipData.internships
                ? internshipData.internships.length
                : 0}{" "}
              results
            </Typography>
          )}
          <InternshipContainer internshipData={internshipData} />
        </Grid>
      </Grid>
    </AllInternshipsContext.Provider>
  );
};

export const useAllInternshipsContext = () => useContext(AllInternshipsContext);
export default AllInternships;
