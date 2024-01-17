import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PhotoIcon from "@mui/icons-material/Photo";
import { Box, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import * as React from "react";

import {
  FormCheckBox,
  FormFile,
  FormRating,
  FormSelect,
} from "../FormComponents";

const statesArray = [
  ["", ""],
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["Arizona", "AZ"],
  ["Arkansas", "AR"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"],
];
const FormRow = ({
  errors,
  name,
  data,
  handleSave,
  autoComplete,
  firstTime,
  type,
  width,
  specialType,
  defaultValue,
  notRequired,
}) => {

  const textInputModified = (
    <TextField
      margin="normal"
      color={firstTime ? "secondary" : errors ? "error" : "success"}
      error={errors ? true : false}
      helperText={errors ? errors : null}
      InputProps={
      
        specialType == "currency"
        ? {
            startAdornment: (
              <InputAdornment position="start">
                <MonetizationOnIcon />
              </InputAdornment>
            ),
          }
        : {
        }
      
      }
      multiline={specialType == "textarea" ? true : false}
      rows={4}
      required={!notRequired}
      onChange={handleSave}
      fullWidth={true}
      name={name}
      label={name.charAt(0).toUpperCase() + name.slice(1)}
      type={type}
      id={name}
      value={data}
      autoComplete={autoComplete}
    />
  );
  const selectInputModified = (
    <FormSelect
      label={name}
      name={name}
      errors={errors}
      onChange={handleSave}
      options={statesArray}
      value= {data}
      required={true}
    />
  );
  const starRatingModified = <FormRating data={data} handleSave={handleSave} />;
  const checkBoxModified = (
    <FormCheckBox
      LabelComponent={
        <Typography variant="subtitle1" color="text.primary">
          Do you want to generate AI Images? Check the box
        </Typography>
      }
      icon={<ImageSearchIcon />}
      checkedIcon={<PhotoIcon />}
      name={name}
      value="on"
    />
  );

  const fileUpload = <FormFile name={name} inputName={name} />;

  return (
    <Box
      sx={{
        background: "transparent",
        textAlign: "center",
        minWidth: width,
      }}
    >
      {specialType == "rating"
        ? starRatingModified
        : specialType == "select"
        ? selectInputModified
        : specialType == "checkbox"
        ? checkBoxModified
        : specialType == "file"
        ? fileUpload
        : textInputModified}
    </Box>
  );
};
export default FormRow;
