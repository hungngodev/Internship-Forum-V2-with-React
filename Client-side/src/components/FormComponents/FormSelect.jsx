import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { Form, useSubmit } from "react-router-dom";
import Grid from "@mui/material/Grid";

const FormSelect = ({label,name,options, defaultValue,onChange,submit}) => {
  return (
    <FormControl sx={{ width: "100%"}}>
      <InputLabel htmlFor={`selectLabelFor${name}`}>{label}</InputLabel>
      <Select
        native
        fullWidth
        defaultValue={defaultValue}
        id={`selectLabelFor${name}`}
        label="option"
        inputProps={{
          "aria-label": name,
          name: name,
          defaultValue: defaultValue,
          id: name,
          type: "text",
        }}
        onChange={onChange}
      >
       {options.map((option)=>(
        <option key={option[0]} value={option[1]}>{option[0]}</option>
         ))}
      </Select>
    </FormControl>
  );
};
export default FormSelect;