import { Grid, Typography } from "@mui/material";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";
import { NavLink } from "react-router-dom";
import Wrapper from "../css/Landing.js";
import Font from "../utils/FontConfiguration.js";

import "bootstrap/dist/css/bootstrap.min.css";

const Landing = () => {
  return (
    <Wrapper>
        <Grid container rowSpacing={10} display="flex" justifyContent="center" sx={{padding:"10px"}}>
          {/* <Grid item xs={12} display="flex" justifyContent="center">
          <Typography variant="h1" color="#fff" fontFamily={Font.title}>
            Internship Forum
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          display="flex"
          justifyContent="center"
          rowSpacing={1}
        >
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h5" color="#fff" fontFamily={Font.subtitle}>
              Start shaping your future today!
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h5" color="#fff" fontFamily={Font.subtitle}>
              Discover, Contribute, and Inspire others with your Internship
              Journey!
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h5" color="#fff" fontFamily={Font.subtitle}>
              Explore diverse opportunities, share your unique experiences, and
              witness a world of possibilities.
            </Typography>
          </Grid>
        </Grid> */}
          <Grid item xs={12}>
            <MouseParallaxContainer
              className="parallax"
              containerStyle={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              globalFactorX={0.3}
              globalFactorY={0.3}
              resetOnLeave
            >
              <MouseParallaxChild
                factorX={1.5}
                factorY={1.5}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "auto",
                  color: "#fff",
                  height: "100%",
                  margin: "1.5rem auto",
                }}
              >
                <Typography variant="h1" color="#fff" fontFamily={Font.title}>
                  Internship Forum
                </Typography>
              </MouseParallaxChild>
              <MouseParallaxChild
                factorX={0.7}
                factorY={0.5}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "auto",
                  height: "100%",
                  margin: "0.3rem auto",
                }}
              >
                <Typography
                  variant="h5"
                  color="#fff"
                  fontFamily={Font.subtitle}
                >
                  Start shaping your future today!
                </Typography>
              </MouseParallaxChild>
              <MouseParallaxChild
                factorX={0.9}
                factorY={0.5}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "auto",
                  height: "100%",
                  margin: "0.3rem auto",
                }}
              >
                <Typography
                  variant="h5"
                  color="#fff"
                  fontFamily={Font.subtitle}
                >
                  Discover, Contribute, and Inspire others with your Internship
                  Journey!
                </Typography>
              </MouseParallaxChild>
              <MouseParallaxChild
                factorX={0.7}
                factorY={0.5}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "auto",
                  height: "100%",
                  margin: "0.3rem auto",
                }}
              >
                <Typography
                  variant="h5"
                  color="#fff"
                  fontFamily={Font.subtitle}
                >
                  Explore diverse opportunities, share your unique experiences,
                  and witness a world of possibilities.
                </Typography>
              </MouseParallaxChild>
            </MouseParallaxContainer>
          </Grid>
          <Grid item xs={12}>
            <div className="d-flex text-center text-white flex-column align-items-center justify-content-end">
              <main className="px-auto my-5">
                <NavLink
                  to={"internships"}
                  style={{
                    backgroundColor: "transparent",
                    color: "fff",
                    textDecoration: "none",
                  }}
                >
                  <div className="card-group">
                    <span className="text-center btnfos">
                      <svg>
                        <rect
                          x="0"
                          y="0"
                          fill="none"
                          width="100%"
                          height="100%"
                        />
                      </svg>
                      <h3>View</h3>
                    </span>

                    {[...Array(8)].map((_, index) => (
                      <div
                        key={index}
                        className="big-card"
                        style={{ borderRadius: "30px" }}
                      ></div>
                    ))}
                  </div>
                </NavLink>
              </main>
            </div>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
    </Wrapper>
  );
};

export default Landing;
