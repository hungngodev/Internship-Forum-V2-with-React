import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { RegisterSchema } from "../../../schemas.js";
import { CustomForm } from "../components";
import { customFetch } from "../utils";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const extract = Object.fromEntries(formData);
    console.log(extract);
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
      console.log(error);
      const message = error?.response?.data?.messageError.includes("email")
        ? "Email already exists"
        : error?.response?.data?.messageError;
      toast.error(message);
      return redirect("/register");
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

  return (
    <CustomForm
      initialState={RegisterState}
      Schema={RegisterSchema}
      title="Sign Up"
      Icon= {<LockOpenIcon />}
      navInfo={{ text: "Already have an account? Sign In", link: "/login" }}
    />
  );
}
