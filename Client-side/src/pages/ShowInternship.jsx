import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ScheduleSharpIcon from "@mui/icons-material/ScheduleSharp";
import TerrainIcon from "@mui/icons-material/Terrain";
import TitleIcon from "@mui/icons-material/Title";
import WorkIcon from "@mui/icons-material/Work";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useQuery } from "@tanstack/react-query";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Image } from "mui-image";
import Carousel from "react-material-ui-carousel";
import { Form, NavLink, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
day.extend(advancedFormat);

import {
  CreateReview,
  DeleteButton,
  EditButton,
  ReviewContainer,
  ShowSingleMap,
} from "../components";
import InternshipInfo from "../components/InternshipContainerComponents/InternshipInfo";
import { customFetch } from "../utils";
import { useHomeLayoutContext } from "./HomeLayout";
import Font from "../utils/FontConfiguration";

const SingleInternshipQuery = (id) => {
  return {
    queryKey: ["SingleInternship", id],
    queryFn: async () => {
      let requestData = await customFetch.get(`/internships/${id}`);
      return requestData.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { data } = await customFetch.get(
        "/e0dca1652c5245168699e24a57e3a8d8"
      );
      const { b3c44b59965a12148f4e3a12757d4e2bc } = data;
      await queryClient.ensureQueryData(SingleInternshipQuery(params.id));
      return {
        id: params.id,
        d715c73521a31edead4500a14d5e391b: b3c44b59965a12148f4e3a12757d4e2bc,
      };
    } catch (error) {
      toast.error(error?.response?.data?.messageError);
      return redirect("/internships");
    }
  };
const ShowInternship = () => {
  const data = useLoaderData();
  const { id } = data;
  const { user, datauser } = useHomeLayoutContext();
  const SingleInternship = useQuery(SingleInternshipQuery(id)).data.internship;
  const imageArray = [
    ...SingleInternship.images.map((item) => item.url),
    ...SingleInternship.imagesURL,
    "https://files.nc.gov/dhhs/styles/event_image/public/images/2023-04/Internship1.jpg?VersionId=wj4ZEZG.nM0C8BQ9a2PZLY0_Bk_PFjuC&itok=bFGXPWTV",
  ];
  const imagesTrue =
    SingleInternship.images.length + SingleInternship.imagesURL.length > 0
      ? true
      : false;
  const {
    title,
    description,
    location,
    area,
    company,
    salary,
    lastModified,
    author,
    reviews,
    link,
    state,
  } = SingleInternship;
  const reviews2 = reviews.slice().reverse();
  let salaryDisplay = salary ? salary + "/h" : "Unspecified Pay";
  let dateDisplay = day(lastModified).format("MMM Do, YYYY");
  return (
    <Box display="flex" alignItems="center" flexDirection="column" sx={{marginTop:"5vh"}}>
      <Grid container alignItems="start" justifyContent="center" spacing={1}>
        <Grid item container xs={12} md={6} rowSpacing={2}>
          <Grid item xs={12}>
            <Carousel
              NextIcon={imagesTrue ? <ArrowForwardIosIcon /> : null}
              PrevIcon={imagesTrue ? <ArrowBackIosNewIcon /> : null}
              interval={10000}
              animation="slide"
              duration={1000}
              navButtonsAlwaysVisible={true}
              cycleNavigation={true}
              indicators={false}
              // IndicatorIcon={<AdjustIcon/>}
            >
              {imageArray.map((item, i) => (
                <Image
                  src={item}
                  key={i}
                  alt={SingleInternship.title}
                  height="30rem"
                  width="100%"
                />
              ))}
            </Carousel>
          </Grid>

          <Grid item xs={12} container spacing={1}>
            <Grid item xs={12}>
              <InternshipInfo
                icon={<TitleIcon color="primary" />}
                variant="h4"
                type="title"
                text={title}
              />
            </Grid>
            <Grid item xs={6}>
              <InternshipInfo
                icon={<LocationOnSharpIcon color="error" />}
                variant="h6"
                text={location}
              />
            </Grid>
            <Grid item xs={6}>
              <InternshipInfo
                icon={<TerrainIcon color="error" />}
                variant="h6"
                text={state}
              />
            </Grid>
            <Grid item xs={6}>
              <InternshipInfo
                icon={<WorkIcon color="error" />}
                variant="h6"
                text={area}
              />
            </Grid>
            <Grid item xs={6}>
              <InternshipInfo
                icon={<ApartmentIcon color="error" />}
                variant="h6"
                text={company}
              />
            </Grid>
            <Grid item xs={6}>
              <InternshipInfo
                icon={<AttachMoneySharpIcon color="error" />}
                variant="h6"
                text={salaryDisplay}
              />
            </Grid>
            <Grid item xs={6}>
              <InternshipInfo
                icon={<ScheduleSharpIcon color="error" />}
                variant="h6"
                text={dateDisplay}
              />
            </Grid>
            <Grid item xs={6}>
              <InternshipInfo
                icon={<AccountBoxIcon color="error" />}
                variant="h6"
                type="link"
                text={
                  <NavLink
                    to={`/profile/${author._id}`}
                    style={{
                      backgroundColor: "transparent",
                      textDecoration: "none",
                    }}
                  >
                    {author.username}
                  </NavLink>
                }
              />
            </Grid>
            <Grid item xs={6}>
              <InternshipInfo
                icon={<OpenInNewIcon color="error" />}
                variant="h6"
                text={
                  <Link href={link} sx={{ color: "info.main" }}>
                    Link to apply
                  </Link>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <InternshipInfo
                icon={<DescriptionIcon color="secondary" />}
                variant="h6"
                type="description"
                text={description}
              />
            </Grid>
            <Grid item xs={12}>
              {user && datauser._id == author._id && (
                <Stack direction="row" spacing={2}>
                  <Form method="post" action={`./delete`}>
                    <DeleteButton type="submit" />
                  </Form>
                  <NavLink
                    to={`./edit`}
                    style={{
                      backgroundColor: "transparent",
                      color: "fff",
                      textDecoration: "none",
                    }}
                  >
                    <EditButton insideComponent="Edit"/>
                  </NavLink>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12} justifyContent="center" display="flex">
              {user ? (
                <CreateReview internship={SingleInternship} action="./review" />
              ) : (
                <Typography
                  variant="h4"
                  color="secondary.main"
                  fontFamily={Font.subtitle}
                  textAlign="center"
                >Login to leave a review!</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          container
          justifyContent="center"
          display="flex"
          rowSpacing={2}
        >
          <Grid item xs={12}>
            <ShowSingleMap
              internship={SingleInternship}
              d8ba971ee917cbe15a969fb624b5b207={
                data.d715c73521a31edead4500a14d5e391b
              }
            />
          </Grid>
          <Grid item xs={12} justifyContent="center" display="flex">
            <Typography variant="h4" color="third.main" fontFamily={Font.title}>
              {SingleInternship.reviews.length == 0
                ? "No Reviews Yet! Be the first one!"
                : "Reviews of this Post"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ReviewContainer reviews={reviews2} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ShowInternship;
