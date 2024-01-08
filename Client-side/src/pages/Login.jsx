import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";


import { LogInSchema } from "../../../schemas.js";
import {
  FormHeader,
  FormIcon,
  FormNavLink,
  FormWrapper,
  SubmitButton,
  TextInput,
} from "../components/FormComponents";
import Wrapper from "../css/Login.js";
import customFetch from "../utils/customFetch";
import resetBodyStyle from "../utils/resetBodyStyle.js";
import { useHomeLayoutContext } from "./HomeLayout";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const extract = Object.fromEntries(formData);
    try {
      const {data} = await customFetch.post("/login", extract, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success("Login successful")
      toast(`Welcome back ${data.username}`);
      return redirect("/internships");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.messageError);
      return redirect("/login");
    }
  };

const defaultTheme = createTheme({});

export default function Login() {

  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [firstTime, setFirsTime] = useState({ username: true, password: true });
  const [ableToSubmit, setAbleToSubmit] = useState(false);

  const validateForm = (event) => {
    if (!ableToSubmit) {
      event.preventDefault();
      toast.error("Please fill in the form correctly");
    }
  };

  const handleSave = (event) => {
    console.dir(event.currentTarget)
    const { name, value } = event.target;
    if (firstTime[name]) {
      setFirsTime({ ...firstTime, [name]: false });
    }
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const { error } = LogInSchema.validate(formData, { abortEarly: false });
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
    <Wrapper>
    <FormWrapper
      form={
        <>
          <FormIcon Icon={<LockOutlinedIcon />} />
          <FormHeader title="Sign in" />
          <Form method="post">
            <TextInput
              name="username"
              errors={errors.username}
              data={formData.username}
              firstTime={firstTime.username}
              handleSave={handleSave}
              autoComplete="username"
            />
            <TextInput
              name="password"
              errors={errors.password}
              data={formData.password}
              firstTime={firstTime.password}
              handleSave={handleSave}
              autoComplete="current-password"
            />
            <SubmitButton handleSubmit={validateForm} text="Sign in"/>
            <FormNavLink
              text="Don't have an account? Sign Up"
              link="/register"
            />
          </Form>
        </>
      }
      theme={defaultTheme}
    />
    </Wrapper>
  );
}
