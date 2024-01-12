import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

import { InternshipContainer } from "../components";
import { SearchBox } from "../components/FormComponents";
import { useHomeLayoutContext } from "./HomeLayout";

const profileQuery = (params) => {
  let search = "";
  let sort = "lastModified";
  let option = false;
  let order = "desc";
  let id = true;
  if (params) {
    search = params.search;
    sort = params.sort;
    option = params.option;
    order = params.order;
    id = params.id;
  }

  return {
    queryKey: ["AllInternship",search, sort, option, order, id],
    queryFn: params
      ? async () => {
          let newParam = { ...params };
          let requestData = await customFetch.get("/internships", {
            params: newParam,
          });
          return requestData.data;
        }
      : async () => {
          let requestData = await customFetch.get("/internships?profile=true");
          return requestData.data;
        },
  };
};

export const loader =
  (queryClient) =>
  async ({ request, params }) => {
    const id = params.id;
    const params2 = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(profileQuery());
    return { searchValues: { ...params2, id: id } };
  };

const Profiles = () => {
  const { datauser } = useHomeLayoutContext();
  const { searchValues } = useLoaderData();
  let profileData = useQuery(profileQuery(searchValues)).data;
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h2" color="initial">
        All Posts of {profileData ? profileData.author.username : "this"}{" "}
        profile
      </Typography>

      <SearchBox searchValues={searchValues} />
      {profileData &&
        (profileData.internships.length == 0 ? (
          <Typography variant="h3" color="initial">
            No posts found
          </Typography>
        ) : (
          <>
            <Typography variant="h3" color="initial">
              Found {profileData ? profileData.internships.length : 0} results
            </Typography>
            <InternshipContainer internshipData={profileData} />
          </>
        ))}
    </Box>
  );
};

export default Profiles;
