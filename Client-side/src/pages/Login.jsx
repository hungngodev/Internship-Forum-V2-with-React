import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { redirect } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

import { LogInSchema } from "../../../schemas.js";
import { CustomForm } from "../components";
import Wrapper from "../css/Login.js";
import customFetch from "../utils/customFetch";

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
      toast.success("Login successful");
      toast(`Welcome back ${data.username}`);
      return redirect("/internships");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.messageError);
      return redirect("/login");
    }
  };

const defaultTheme = createTheme({});

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
export default function Login() {
  return (
    <Wrapper>
      <Box
      >
        <CustomForm
          initialState={LoginState}
          Schema={LogInSchema}
          title="Sign In"
          Icon={<VpnKeyIcon />}
          navInfo={{
            text: "Don't have an account? Sign Up",
            link: "/register",
          }}
        />
      </Box>
    </Wrapper>
  );
}
