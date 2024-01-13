import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography>
      {"Copyright © "}
        Hung Ngo  {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        component="footer"
        sx={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "center",
          backgroundColor:"transparent",
          opacity:1
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ display: "flex", justifyContent: "center" ,color: 'white'}}
        >
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
