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
      Hung Ngo {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: "auto",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        opacity: 1,
        color: "info.main",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Copyright />
      </Container>
    </Box>
  );
}
