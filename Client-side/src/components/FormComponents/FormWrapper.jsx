import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";

const FormWrapper = ({form, theme, width}) => {
  return (
    <ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width:"100%",
            backgroundColor:"black"
          }}
        >
          {form}
        </Box>
    </ThemeProvider>
  );
};
export default FormWrapper;
