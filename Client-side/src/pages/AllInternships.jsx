import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

import { InternshipContainer } from "../components";
import { SearchBox } from "../components/FormComponents";
import { useHomeLayoutContext } from "./HomeLayout";

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
    queryKey: ["AllInternship",search, sort, option, order],
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
    await queryClient.ensureQueryData(allInternshipsQuery());
    return { searchValues: { ...params } };
  };

const AllInternshipsContext = createContext();
const AllInternships = () => {
  const { datauser } = useHomeLayoutContext();
  const { searchValues } = useLoaderData();
  console.log(searchValues);
  let internshipData = useQuery(allInternshipsQuery(searchValues)).data;
  return (
    <AllInternshipsContext.Provider value={{ internshipData, searchValues }}>
      <Box display="flex" alignItems="center" flexDirection="column">
      {/* <Wrapper>
        <ClusterMap
          internship={internshipData ? internshipData.internships : []}
          token={internshipData ? internshipData.token : ""}
        />
      </Wrapper> */}
      <Typography variant="h2" color="initial">All Internships of this Forum</Typography>
      <SearchBox searchValues={searchValues} />
      {internshipData && <Typography variant="h3" color="initial">
        Found {internshipData ? internshipData.internships.length : 0} results
      </Typography>}
      <InternshipContainer internshipData={internshipData}/>
      </Box>
    </AllInternshipsContext.Provider>
  );
};

export const useAllInternshipsContext = () => useContext(AllInternshipsContext);
export default AllInternships;
