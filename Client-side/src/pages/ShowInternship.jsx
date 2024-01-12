import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Grid, Typography,Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Image } from "mui-image";
import Carousel from "react-material-ui-carousel";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";
import ScheduleSharpIcon from "@mui/icons-material/ScheduleSharp";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { NavLink,Form } from "react-router-dom";
day.extend(advancedFormat);

import { ShowSingleMap, ReviewContainer, CreateReview } from "../components";
import InternshipInfo from "../components/InternshipContainerComponents/InternshipInfo";
import { customFetch } from "../utils";
import { useHomeLayoutContext } from "./HomeLayout";

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
      await queryClient.ensureQueryData(SingleInternshipQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/internships");
    }
  };
const ShowInternship = () => {
  const id = useLoaderData();
  const { user,datauser} = useHomeLayoutContext();
  const SingleInternship = useQuery(SingleInternshipQuery(id)).data.internship;
  const imageArray = [
    ...SingleInternship.images.map((item) => item.url),
    ...SingleInternship.imagesURL,
    "https://files.nc.gov/dhhs/styles/event_image/public/images/2023-04/Internship1.jpg?VersionId=wj4ZEZG.nM0C8BQ9a2PZLY0_Bk_PFjuC&itok=bFGXPWTV",
  ];
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
  } = SingleInternship;
  const reviews2 = reviews.slice().reverse();
  let salaryDisplay = salary ? salary + "/h" : "Unspecified Pay";
  let dateDisplay = day(lastModified).format("MMM Do, YYYY");
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Grid container alignItems="start" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Carousel
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosNewIcon />}
            interval={10000}
            animation="slide"
            duration={1000}
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
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
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <InternshipInfo icon={<TitleIcon />} variant="h6" text={title} />
            <InternshipInfo
              icon={<DescriptionIcon />}
              variant="subtitle1"
              text={description}
            />
            <InternshipInfo
              icon={<LocationOnSharpIcon />}
              variant="overline"
              text={location}
            />
            <InternshipInfo
              icon={<WorkIcon />}
              variant="overline"
              text={area}
            />
            <InternshipInfo
              icon={<ApartmentIcon />}
              variant="overline"
              text={company}
            />
            <InternshipInfo
              icon={<AttachMoneySharpIcon />}
              variant="overline"
              text={salaryDisplay}
            />
            <InternshipInfo
              icon={<ScheduleSharpIcon />}
              variant="overline"
              text={dateDisplay}
            />
            <InternshipInfo
              icon={<AccountBoxIcon />}
              variant="overline"
              text={
                <NavLink
                  to={`/profile/${author._id}`}
                  style={{
                    backgroundColor: "transparent",
                    color: "fff",
                    textDecoration: "none",
                  }}
                >
                  {author.username}
                </NavLink>
              }
            />
          </Box>
          {user && datauser._id == author._id && (
            <Form method="post" action={`./delete`}>
              <Button
                variant="outlined"
                type="submit"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Form>
          )}
          {user ? (
            <CreateReview internship={SingleInternship} action="./review" />
          ) : (
            <Typography variant="h4" color="initial">
              Login to leave a review!
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <ShowSingleMap internship={SingleInternship} />
          {SingleInternship.reviews.length > 0 ? (
            <ReviewContainer reviews={reviews2} />
          ) : (
            <Typography variant="h4">
              No Reviews Yet! Be the first one!
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default ShowInternship;
