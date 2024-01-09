import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import { Image } from "mui-image";
import { Box, Grid } from "@mui/material";
import styled from "@mui/system/styled";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";
import ScheduleSharpIcon from "@mui/icons-material/ScheduleSharp";

import InternshipInfo from "./InternshipInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Title } from "@mui/icons-material";
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

  let salaryDisplay = salary ? salary : "Unspecified Pay";
  let dateDisplay = day(lastModified).format("MMM Do, YYYY");
  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{
        '&:hover': {
            border: '1px solid', 
        }
    }}>
      <Grid container >
        <Grid item md={6}>
          <Image src={imageDisplay} alt={title} height="100%" width="100%" />
        </Grid>
        <Grid item md={6}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <InternshipInfo icon={<TitleIcon />} variant="h5" text={title} />
            <InternshipInfo
              icon={<DescriptionIcon />}
              variant="body2"
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
              text={salaryDisplay + "/h"}
            />
            <InternshipInfo
              icon={<ScheduleSharpIcon />}
              variant="overline"
              text={dateDisplay}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default InternshipCard;
