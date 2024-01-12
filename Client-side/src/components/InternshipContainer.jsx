import { Box, Grid } from "@mui/material";
import {
  InternshipCard,
  PaginationButton,
} from "./InternshipContainerComponents";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const InternshipContainer = ({ internshipData }) => {
  if (!internshipData) {
    return <h1>Loading...</h1>;
  }

  const { internships } = internshipData;

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  if (!internshipData.hasOwnProperty("internships")) {
    return <h1>No internships available</h1>;
  } else {
    const { internships } = internshipData;
    const countPerPage = 6;
    const count =
      internships.length % countPerPage == 0
        ? Math.floor(internships.length / countPerPage)
        : Math.floor(internships.length / countPerPage) + 1;
    const prev = (page - 1) * countPerPage;
    const next = page * countPerPage;
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Page: {page}</Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {internships.slice(prev, next).map((internship) => (
            <Grid key={internship._id} item md={6} xxl={4}>
              <NavLink
                to={`/internships/${internship._id}`}
                style={{
                  backgroundColor: "transparent",
                  color: "fff",
                  textDecoration: "none",
                }}
              >
                <InternshipCard
                  title={internship.title}
                  salary={internship.salary}
                  area={internship.area}
                  description={internship.description}
                  location={internship.location}
                  company={internship.company}
                  link={internship.link}
                  images={internship.images}
                  imagesUrl={internship.imagesURL}
                  lastModified={internship.lastModified}
                  key={internship._id}
                />
              </NavLink>
            </Grid>
          ))}
        </Grid>
        {count > 1 && (
          <Stack spacing={2} sx={{ zIndex: 10 }}>
            <Pagination
              count={count}
              page={page}
              onChange={handleChange}
              size="large"
            />
          </Stack>
        )}
        <Box sx={{ flexGrow: 1 }} />
      </Box>
    );
  }
};
export default InternshipContainer;
