import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { Form, useSubmit } from "react-router-dom";
import Grid from "@mui/material/Grid";

const FormSelect = ({label,name,options,value, defaultValue,errors,onChange,submit,require}) => {
  return (
    <FormControl sx={{ width: "100%"}} error= {errors ? true : false}>
      <InputLabel htmlFor={`selectLabelFor${name}`}>{label}</InputLabel>
      <Select
        native
        fullWidth
        required={require}
        value={value}
        id={`selectLabelFor${name}`}
        label="option"
        inputProps={{
          "aria-label": name,
          name: name,
          id: name,
          type: "text",
        }}
        defaultValue={defaultValue}
        onChange={onChange}
          
      >
       {options.map((option)=>(
        <option key={option[0]} value={option[1]}>{option[0]}</option>
         ))}
      </Select>
      {errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};
export default FormSelect;