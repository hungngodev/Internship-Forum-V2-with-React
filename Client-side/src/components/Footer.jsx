import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Font from "../utils/FontConfiguration";

function Copyright() {
  return (
    <Typography variant ="h4" textAlign="center" fontFamily={Font.subtitle}>
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
