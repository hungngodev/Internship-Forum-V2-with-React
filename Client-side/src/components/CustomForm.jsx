import { Box, Grid, Stack } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FormHeader,
  FormIcon,
  FormNavLink,
  SubmitButton,
  TextInput,
} from "./FormComponents";

const defaultTheme = createTheme({});

export default function CustonForm({
  initialState,
  Schema,
  navInfo,
  title,
  Icon,
  action,
  width,
  align,
  encrypt,
  method,
}) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(
    Object.keys(initialState).reduce((acc, key) => {
      acc[key] = initialState[key].type == "number" ? 0 : "";
      return acc;
    }, {})
  );
  const [firstTime, setFirsTime] = useState(
    Object.keys(initialState).reduce((acc, key) => {
      acc[key] = initialState[key].notRequired ? false : true;
      return acc;
    }, {})
  );
  const [ableToSubmit, setAbleToSubmit] = useState(false);

  const validateForm = (event) => {
    console.log(errors)
    if (!ableToSubmit) {
      event.preventDefault();
      toast.error("Please fill in the form correctly");
    }
  };

  const handleSave = (event) => {
    let { name, value } = event.target;
    if (firstTime[name]) {
      setFirsTime({ ...firstTime, [name]: false });
    }
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const { error } = Schema.validate(formData, { abortEarly: false });
    let errorData = {};
    if (error) {
      error.details.forEach((err) => {
        if (!firstTime[err.context.key]) {
          errorData[err.context.key] = err.message;
        }
      });
    }
    const first = Object.values(firstTime).every((value) => value);
    setErrors(errorData);
    if (Object.keys(errorData).length != 0 || first == true) {
      setAbleToSubmit(false);
    } else {
      setAbleToSubmit(true);
    }
  }, [formData]);

  let textInput = [];
  for (let key in initialState) {
    textInput.push(
      <TextInput
        key={key}
        name={key.name ? key.name : String(key)}
        errors={errors[key]}
        data={formData[key]}
        firstTime={firstTime[key]}
        handleSave={handleSave}
        autoComplete={initialState[key].autoComplete}
        type={initialState[key].type}
        width={width ? width : "100%"}
        specialType={initialState[key].specialType || ""}
      />
    );
  }
  return (
    <Stack
      spacing={2}
      direction="column"
      alignItems={align ? align : "center"}
      justifyContent="center"
    >
      <FormIcon Icon={Icon} />
      <FormHeader title={title} />
      <Form
        method={method ? method : "POST"}
        action={action ? action : ""}
        encType={encrypt ? "multipart/form-data" : ""}
      >
        {textInput}

        <SubmitButton handleSubmit={validateForm} text={title} />
        <FormNavLink text={navInfo.text} link={navInfo.link} />
      </Form>
    </Stack>
  );
}
