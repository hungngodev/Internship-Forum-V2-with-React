import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Grid, Typography } from "@mui/material";
import { Image } from "mui-image";
import * as React from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";

import { LogInSchema } from "../../../schemas.js";
import loginDark2 from "../assets/images/login/loginDark2.svg";
import loginLight2 from "../assets/images/login/loginLight2.svg";
import logoLight from "../assets/images/logo/logoLight.svg";
import { CustomForm } from "../components";
import customFetch from "../utils/customFetch";
import Font from "../utils/FontConfiguration";
import { LoginDemoUser } from "../components";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const extract = Object.fromEntries(formData);
    try {
      const { data } = await customFetch.post("/login", extract, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      queryClient.invalidateQueries();
      toast(`Welcome back ${data.username}`);
      return redirect("/internships");
    } catch (error) {
      toast.error(error?.response?.data?.messageError);
      return redirect("/login");
    }
  };

export const loader = (queryClient) => async () => {
  try {
    await customFetch.get("/login");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.messageError);
    return redirect("/internships");
  }
};

const LoginState = {
  username: {
    type: "text",
    autoComplete: "username",
  },
  password: {
    type: "password",
    autoComplete: "current-password",
  },
};
export default function Login({ queryClient }) {
  const theme = useTheme();
  const darkTheme = theme.palette.mode === "dark";
  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h2"
          color="primary"
          fontFamily={Font.title}
          sx={{ marginBottom: "20px" }}
        >
          Internship Forum
        </Typography>
        <CustomForm
          initialState={LoginState}
          Schema={LogInSchema}
          title="Sign In"
          Icon={<VpnKeyIcon />}
          navInfo={{
            text: "Don't have an account? Sign Up",
            link: "/register",
          }}
          width="30vw"
          OptionalFormComponent={<LoginDemoUser reloadFunction={queryClient} />}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <MouseParallaxContainer className="parallax" resetOnLeave>
          <MouseParallaxChild factorX={0.02} factorY={0.02}>
            <Image
              src={darkTheme ? loginDark2 : loginLight2}
              alt="login"
              height="auto"
              width="45vw"
              easing="cubic-bezier(0.25, 0.1, 0.25, 1.0)"
            />
          </MouseParallaxChild>
        </MouseParallaxContainer>
      </Grid>
    </Grid>
  );
}
