import { Link, useRouteError } from "react-router-dom";
const number = Math.floor(Math.random()*35)
import img from "../assets/images/error/1.svg";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Font from "../utils/FontConfiguration";

const Error = () => {
  const theme = useTheme();
  console.log(theme);
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="start"
        sx={{ height: "100vh", backgroundColor: "#708090" }}
      >
        <img src={img} alt="not found" />
        <Typography variant="h1" color="text.primary" fontFamily={Font.title}>
          Page not found
        </Typography>
        <Typography variant="h4" color="initial" fontFamily={Font.subtitle}>
          {" "}
          we can't seem to find the page you are looking for
        </Typography>
        <Link to="/internships">
          <Button variant="outlined" size="large">
            <Typography variant="h3" color="primary" fontFamily={Font.text}>
              Back Home
            </Typography>
          </Button>
        </Link>
      </Grid>
    );
  }
  return (
    <div>
      <h3>something went wrong</h3>
    </div>
  );
};
export default Error;
