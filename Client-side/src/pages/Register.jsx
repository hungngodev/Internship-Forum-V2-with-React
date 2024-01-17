import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useTheme } from "@mui/material/styles";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";
import { Grid,Typography } from "@mui/material";
import { Image } from "mui-image";

import { RegisterSchema } from "../../../schemas.js";
import { CustomForm } from "../components";
import { customFetch } from "../utils";
import registerDark from "../assets/images/register/registerDark.svg";
import registerLight from "../assets/images/register/registerLight.svg";
import logoLight from "../assets/images/logo/logoLight.svg";
import Font from "../utils/FontConfiguration";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const extract = Object.fromEntries(formData);
    try {
      const { data } = await customFetch.post("/register", extract, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      queryClient.invalidateQueries();
      toast.success("Register successful! ");
      toast(`Welcome ${data.username} to Internship Forum`);
      return redirect("/internships");
    } catch (error) {
      const message = error?.response?.data?.messageError.includes("email")
        ? "Email already exists"
        : error?.response?.data?.messageError;
      toast.error(message);
      return redirect("/register");
    }
  };

export const loader = (queryClient) => async () => {
  try {
    await customFetch.get("/register");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.messageError);
    return redirect("/internships");
  }
};
const RegisterState = {
  username: {
    type: "text",
    autoComplete: "username",
  },
  email: {
    type: "email",
    autoComplete: "email",
  },
  password: {
    type: "password",
    autoComplete: "current-password",
  },
};

const defaultTheme = createTheme({});

export default function Register() {
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
            initialState={RegisterState}
            Schema={RegisterSchema}
            title="Sign Up"
            Icon={<LockOpenIcon />}
            navInfo={{
              text: "Already have an account? Sign In",
              link: "/login",
            }}
            width="30vw"
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
              src={darkTheme ? registerDark : registerLight}
              alt="register"
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
