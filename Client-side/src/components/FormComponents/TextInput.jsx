import TextField from "@mui/material/TextField";
import * as React from "react";
import { Theme } from "..";
import { Box } from "@mui/material";

const FormRow = ({
  errors,
  name,
  data,
  handleSave,
  autoComplete,
  firstTime,
}) => {
  return (
    <Box sx={{ backgroundColor: "white", color: "white" }}>
      {firstTime ? (
        <TextField
          margin="normal"
          color= "secondary"
          required
          fullWidth
          name={name}
          label={name.charAt(0).toUpperCase() + name.slice(1)}
          type={name}
          id={name}
          value={data}
          onChange={handleSave}
          autoComplete={autoComplete}
        />
      ) : errors ? (
        <TextField
          error
          helperText={errors}
          margin="normal"
          required
          fullWidth
          name={name}
          label={name.charAt(0).toUpperCase() + name.slice(1)}
          type={name}
          id={name}
          value={data}
          onChange={handleSave}
          autoComplete={autoComplete}
        />
      ) : (
        <TextField
          margin="normal"
          required
          fullWidth
          color="success"
          name={name}
          label={name.charAt(0).toUpperCase() + name.slice(1)}
          type={name}
          id={name}
          value={data}
          onChange={handleSave}
          autoComplete={autoComplete}
          sx={{ fontWeight: "bold" }}
        />
      )}
    </Box>
  );
};
export default FormRow;
