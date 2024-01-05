import TextField from "@mui/material/TextField";
import * as React from "react";

const FormRow = ({ errors, name, data, handleSave }) => {
  return (
    <>
      {errors ? (
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
        />
      ) : (
        <TextField
          margin="normal"
          required
          fullWidth
          name={name}
          label={name.charAt(0).toUpperCase() + name.slice(1)}
          type={name}
          id={name}
          value={data}
          onChange={handleSave}
        />
      )}
    </>
  );
};
export default FormRow;
