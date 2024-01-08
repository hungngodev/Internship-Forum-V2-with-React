import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { RegisterSchema } from "../../../schemas.js";
import {
  FormHeader,
  FormIcon,
  FormNavLink,
  FormWrapper,
  SubmitButton,
  TextInput,
} from "../components/FormComponents";
import { customFetch, resetBodyStyle } from "../utils";
import { useHomeLayoutContext } from "./HomeLayout.jsx";

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



const defaultTheme = createTheme({});

export default function Register() {



  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [firstTime, setFirsTime] = useState({
    username: true,
    email: true,
    password: true,
  });
  const [ableToSubmit, setAbleToSubmit] = useState(false);

  const validateForm = (event) => {
    if (!ableToSubmit) {
      event.preventDefault();
      toast.error("Please fill in the form correctly");
    }
  };

  const handleSave = (event) => {
    const { name, value } = event.target;
    if (firstTime[name]) {
      setFirsTime({ ...firstTime, [name]: false });
    }
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const { error } = RegisterSchema.validate(formData, { abortEarly: false });
    let errorData = {};
    let first = false;
    if (error) {
      error.details.forEach((err) => {
        if (!firstTime[err.context.key]) {
          errorData[err.context.key] = err.message;
        } else {
          first = true;
        }
      });
    }
    setErrors(errorData);
    if (Object.keys(errorData).length != 0 || first == true) {
      setAbleToSubmit(false);
    } else {
      setAbleToSubmit(true);
    }
  }, [formData]);

  return (
    <FormWrapper
      form={
        <>
          <FormIcon Icon={<LockOutlinedIcon />} />
          <FormHeader title="Sign Up" />
          <Form method="post">
            <TextInput
              name="username"
              errors={errors.username}
              data={formData.username}
              handleSave={handleSave}
              autoComplete="username"
            />
            <TextInput
              name="email"
              errors={errors.email}
              data={formData.email}
              handleSave={handleSave}
              autoComplete="email"
            />
            <TextInput
              name="password"
              errors={errors.password}
              data={formData.password}
              handleSave={handleSave}
              autoComplete="current-password"
            />
            <SubmitButton handleSubmit={validateForm} text="Register" />
            <FormNavLink text="Have an account? Sign In" link="/login" />
          </Form>
        </>
      }
      theme={defaultTheme}
    />
  );
}
