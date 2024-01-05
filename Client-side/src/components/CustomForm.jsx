import { Link as LinkDom, Form, redirect, useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, Controller } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import customFetch from "../utils/customFetch";
import { LogInSchema } from "../../../schemas.js";
import { useHomeLayoutContext } from "../pages/HomeLayout";
import {
  SubmitButton,
  TextInput,
  FormIcon,
  FormNavLink,
  FormHeader,
} from "./FormComponents";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      toast.success("Login successful");
      await customFetch.post("/login", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      queryClient.invalidateQueries();
      return redirect("/internships");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.messageError);
      return redirect("");
    }
  };

const LogInConfig = {
  backgroundImage: "none",
};

const defaultTheme = createTheme();

const CustomForm = () => {
  const { BodyConfig, changeBodyConfig } = useHomeLayoutContext();
  useEffect(() => {
    changeBodyConfig({ ...LogInConfig });
  }, []);
  for (let e in document.body.style) {
    e = "";
  }
  for (let e in BodyConfig) {
    document.body.style[e] = BodyConfig[e];
  }

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [firstTime, setFirsTime] = useState({ username: true, password: true });
  const [ableToSubmit, setAbleToSubmit] = useState(false);

  const validateForm = (event) => {
    event.preventDefault();
    console.log(ableToSubmit);
    if (!ableToSubmit) {
      toast.error("Please fill in the form correctly");
    }
  };

  const handleSave = (event) => {
    const { name, value } = event.target;
    if (firstTime[name]) {
      setFirsTime({ ...firstTime, [name]: false });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
    const { error } = LogInSchema.validate(formData);
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
    console.log(errorData);
    setErrors(errorData);
    if (Object.keys(errorData).length != 0 || first == true) {
      setAbleToSubmit(false);
    } else {
      setAbleToSubmit(true);
    }
  }, [formData]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormIcon Icon={<LockOutlinedIcon />} />
          <FormHeader title="Sign in" />
          <Form method="post">
            <TextInput
              errors={errors.username}
              name="username"
              data={formData.username}
              handleSave={handleSave}
            />
            <TextInput
              errors={errors.password}
              name="password"
              data={formData.password}
              handleSave={handleSave}
            />
            <SubmitButton handleSubmit={validateForm} />
            <FormNavLink link={""} message={""} />
          </Form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CustomForm;
