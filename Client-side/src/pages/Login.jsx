import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { LogInSchema } from "../../../schemas.js";
import { CustomForm } from "../components";
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
export default function Login() {
  return (
    <Box>
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
  );
}
