import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

import customFetch from "../utils/customFetch";
import { InternshipContainer, UserInfoPage } from "../components";
import { SearchBox } from "../components/FormComponents";
import { useHomeLayoutContext } from "./HomeLayout";
import Font from "../utils/FontConfiguration";

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
    queryKey: ["AllInternship", search, sort, option, order, id],
    queryFn: async () => {
      let newParam = { ...params };
      let requestData = await customFetch.get("/internships", {
        params: newParam,
      });
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
    try {
      const { data } = await customFetch.get(`/profile/${id}`);
      const defaultParams = {
        search: params2.search ? params2.search : "",
        sort: params2.sort ? params2.sort : "lastModified",
        option: params2.option ? params2.option : true,
        order: params2.order ? params2.order : "desc",
      };
      await queryClient.ensureQueryData(profileQuery(defaultParams));
      return {
        searchValues: { ...defaultParams, id: id },
        author: data.author,
        user: data.user,
      };
    } catch (error) {
      toast.error(error?.response?.data?.messageError);
      return redirect("/internships");
    }
  };

const Profiles = () => {
  const { searchValues, user,author } = useLoaderData();
  let profileData = useQuery(profileQuery(searchValues)).data;
  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      flexDirection="column"
      rowSpacing={4}
    >
      {!user && (<Grid item xs={12} sx={{width: "80vw"}}>
        <UserInfoPage {...author} />
      </Grid>)}
      <Grid item xs={12}>
        <Typography
          variant="h3"
          color="primary"
          fontFamily={Font.title}
          sx={{ textAlign: "center" }}
        >
          All Posts of {profileData ? profileData.author.username : "this"}{" "}
          profile
        </Typography>
      </Grid>
      <Grid item xs={12}>
          {profileData?.internships.length>0 && <SearchBox searchValues={searchValues} />}
        </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        {profileData &&
          (profileData.internships.length == 0 ? (
            <Typography
              variant="h3"
              color="secondary"
              fontFamily={Font.subtitle}
            >
              This user has not posted any internships yet
            </Typography>
          ) : (
            <>
              <Typography
                variant="h3"
                color="secondary"
                fontFamily={Font.subtitle}
              >
                Found{" "}
                {profileData.internships ? profileData.internships.length : 0}{" "}
                results
              </Typography>
              <InternshipContainer internshipData={profileData} />
            </>
          ))}
      </Grid>
    </Grid>
  );
};

export default Profiles;
