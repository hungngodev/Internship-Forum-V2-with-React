import { Box, Grid } from "@mui/material";
import {
  InternshipCard,
  PaginationButton,
} from "./InternshipContainerComponents";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";
import { ScrollParallax } from "react-just-parallax";

import Font from "../utils/FontConfiguration";

const InternshipContainer = ({ internshipData }) => {
  if (!internshipData) {
    return <h1>Loading...</h1>;
  }

  const { internships } = internshipData;

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    window.scrollTo(0, 900);
  }, [page]);
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
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        rowSpacing={2}
        container
        sx={{ padding: "40px" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" color="info.main" fontFamily={Font.text}>
            Page: {page}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            rowSpacing={4}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {internships.slice(prev, next).map((internship) => (
              <Grid
                key={internship._id}
                item
                md={6}
                xxl={4}
                sx={{ marginTop: "10vh" }}
              >
                <NavLink
                  to={`/internships/${internship._id}`}
                  style={{
                    backgroundColor: "transparent",
                    color: "fff",
                    textDecoration: "none",
                  }}
                >
                  <ScrollParallax
                    shouldPause
                    enableOnTouchDevice
                    strength={0.14}
                  >
                    <MouseParallaxContainer className="parallax" resetOnLeave>
                      <MouseParallaxChild factorX={0.03} factorY={0.03}>
                        <InternshipCard
                          title={internship.title}
                          salary={internship.salary}
                          area={internship.area}
                          description={internship.description}
                          location={internship.location}
                          state={internship.state}
                          company={internship.company}
                          link={internship.link}
                          images={internship.images}
                          imagesUrl={internship.imagesURL}
                          lastModified={internship.lastModified}
                          key={internship._id}
                        />
                      </MouseParallaxChild>
                    </MouseParallaxContainer>
                  </ScrollParallax>
                </NavLink>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "2vh" }}>
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
        </Grid>
        <Box sx={{ flexGrow: 1 }} />
      </Grid>
    );
  }
};
export default InternshipContainer;
