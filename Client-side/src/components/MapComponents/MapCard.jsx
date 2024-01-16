import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";
import { NavLink } from "react-router-dom";

import { InternshipInfo } from "../InternshipContainerComponents";

export default function MultiActionAreaCard({
  title,
  company,
  salary,
  urlImage,
  height,
  width,
  link,
  id
}) {
  let salaryDisplay = salary ? salary : "Unspecified Pay";
  return (
    <Card sx={{ }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={height}
          image={urlImage}
          alt={company}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" color = "primary">
            {title}
          </Typography>
          <InternshipInfo
            icon={<ApartmentIcon />}
            variant="overline"
            text={company}
          />
          <InternshipInfo
            icon={<AttachMoneySharpIcon />}
            variant="overline"
            text={salaryDisplay + "/h"}
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
      <NavLink to={`/internships/${id}`}>
        <Typography variant="h5" color="info.main">See more</Typography>
      </NavLink>
      </CardActions>
    </Card>
  );
}
