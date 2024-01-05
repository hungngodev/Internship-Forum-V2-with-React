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
import { SubmitButton } from "../components";
import { useHomeLayoutContext } from "./HomeLayout";

import "./Login.css";

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

export default function Login() {
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
    console.log("hi");
    console.log(formData);
    const { error } = LogInSchema.validate(formData);
    let errorData = {};
    let first = false;
    console.log(error.details);
    error.details.forEach((err) => {
        errorData[err.context.key] = err.message;
    });
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Form method="post">
            {errors.username ? (
              <TextField
                error
                helperText={errors.username}
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="username"
                autoComplete="Username"
                value={formData.username}
                onChange={handleSave}
                autoFocus
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="username"
                autoComplete="Username"
                value={formData.username}
                onChange={handleSave}
                autoFocus
              />
            )}

            {errors.password ? (
              <TextField
                error
                helperText={errors.password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleSave}
                autoComplete="current-password"
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleSave}
                autoComplete="current-password"
              />
            )}
            <SubmitButton handleSubmit={validateForm} />
            <Grid container>
              <Grid item>
                <NavLink to="../register">
                  Don't have an account? Sign Up
                </NavLink>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
