import ApartmentIcon from "@mui/icons-material/Apartment";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import ScheduleSharpIcon from "@mui/icons-material/ScheduleSharp";
import TerrainIcon from "@mui/icons-material/Terrain";
import TitleIcon from "@mui/icons-material/Title";
import WorkIcon from "@mui/icons-material/Work";
import { Box, Grid } from "@mui/material";
import styled from "@mui/system/styled";
import { Image } from "mui-image";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import InternshipInfo from "./InternshipInfo";
day.extend(advancedFormat);

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
}));

const InternshipCard = ({
  title,
  salary,
  area,
  description,
  location,
  company,
  link,
  images,
  imagesUrl,
  lastModified,
  state,
}) => {
  let imageDisplay = "";
  if (images.length > 0) {
    imageDisplay = images[0].url;
  } else {
    if (imagesUrl.length) {
      imageDisplay = imagesUrl[[Math.floor(Math.random() * (5 - 1 + 1)) + 1]];
    } else {
      imageDisplay =
        "https://files.nc.gov/dhhs/styles/event_image/public/images/2023-04/Internship1.jpg?VersionId=wj4ZEZG.nM0C8BQ9a2PZLY0_Bk_PFjuC&itok=bFGXPWTV";
    }
  }

  let salaryDisplay = salary ? salary + "/h" : "Unspecified Pay";
  let dateDisplay = day(lastModified).format("MMM Do, YYYY");
  const borderRadius = "30";
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        border: "2px solid",
        borderColor: "info.main",
        borderRadius:`${borderRadius}px`,
        "&:hover": {
          border: "7px solid",
          borderColor: "info.main",
        },
        height:"100%"
      }}
    >
      <Grid container columnSpacing={1}>
        <Grid item xs={12} sm={4} md={5} lg={6}>
          <Image
            src={imageDisplay}
            alt={title}
            sx={{height:{xs:"10rem",sm:"27rem",md:"26rem",lg:"25rem"},  borderRadius: `${borderRadius-2}px`}}
            width="100%"
          />
        </Grid>
        <Grid item xs={12} sm={8} md={7} lg={6} sx={{padding: "1rem"}}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InternshipInfo
                icon={<TitleIcon color="primary" />}
                variant="h6"
                type="title"
                text={title.slice(0, 40) + "..."}
              />
            </Grid>
            <Grid item xs={12}>
              <InternshipInfo
                icon={<DescriptionIcon color="info" />}
                variant="body2"
                type="description"
                text={description.slice(0, 80) + "..."}
              />
            </Grid>
            <Grid item xs={12}>
              <InternshipInfo
                icon={<LocationOnSharpIcon color="error" />}
                variant="overline"
                text={location.slice(0,17)}
              />
            </Grid>
            <Grid item xs={12}>
              <InternshipInfo
                icon={<TerrainIcon color="error" />}
                variant="overline"
                text={state.slice(0,5)}
              />
            </Grid>
            <Grid item xs={12}>
              <InternshipInfo
                icon={<WorkIcon color="error" />}
                variant="overline"
                text={area.slice(0,23)}
              />
            </Grid>
            <Grid item xs={12}>
              <InternshipInfo
                icon={<ApartmentIcon color="error" />}
                variant="overline"
                text={company.slice(0,17)}
              />
            </Grid>
            <Grid item xs={12}>
              <InternshipInfo
                icon={<AttachMoneySharpIcon color="error" />}
                variant="overline"
                text={salaryDisplay}
              />
            </Grid>
            <Grid item xs={12}>
              <InternshipInfo
                icon={<ScheduleSharpIcon color="error" />}
                variant="overline"
                text={dateDisplay}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default InternshipCard;
