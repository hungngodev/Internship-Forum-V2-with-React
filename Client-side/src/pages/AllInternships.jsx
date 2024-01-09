import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { InternshipContainer,ClusterMap } from "../components";
import { resetBodyStyle } from "../utils";
import { useHomeLayoutContext } from "./HomeLayout";
import { SearchBox } from "../components/FormComponents";
import Wrapper from "../css/AllInternships.js";

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
    queryKey: [search, sort, option, order],
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
      <h1>{datauser ? datauser.username : "not defined"}</h1>
        <Wrapper>
            <ClusterMap internship={internshipData? internshipData.internships :[]}token = {internshipData? internshipData.token: ''}/>
        </Wrapper>
      <SearchBox />
      <InternshipContainer />
    </AllInternshipsContext.Provider>
  );
};

export const useAllInternshipsContext = () => useContext(AllInternshipsContext);
export default AllInternships