import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PhotoIcon from "@mui/icons-material/Photo";
import { Box, Stack, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { MuiFileInput } from "mui-file-input";
import CloseIcon from "@mui/icons-material/Close";

import { FormRating, FormSelect, FormCheckBox } from "../FormComponents";

export default function FormFile({name, inputName, }){
    const [file, setFile] = React.useState(null);

    const handleChange = (newFile) => {
      setFile(newFile);
    };
  
    return (
        <MuiFileInput
        placeholder="Upload Your Image: PNG, JPG and JPEG only"
        value={file}
        fullWidth={true}
        onChange={(newFile) => {
          setFile(newFile);
        }}
        label={name.charAt(0).toUpperCase() + name.slice(1)}
        getInputText={(value) => {
          return value ? value.name + "   Thanks!" : "";
        }}
        name={inputName}
        InputProps={{
          inputProps: {
            accept: ".png,.jpg,.jpeg",
          },
          startAdornment: (
            <InputAdornment position="start">
              <AddPhotoAlternateIcon />
            </InputAdornment>
          ),
        }}
        clearIconButtonProps={{
          title: "Remove",
          children: <CloseIcon fontSize="small" />,
        }}
      />
    )
}