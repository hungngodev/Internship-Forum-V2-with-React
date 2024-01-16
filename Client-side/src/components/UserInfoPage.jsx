import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { EditButton } from "../components";
import Font from "../utils/FontConfiguration";


export default function UserInfoPage({image,email,username,description,location,phoneNumber,proNoun}){
    return (
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={1}
      >
        <Grid item container rowSpacing={2} direction="column"
        justifyContent="center"
        alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <PhotoCameraIcon
                sx={{
                  padding: ".1rem",
                  width: 35,
                  height: 35,
                }}
                color="secondary"
              ></PhotoCameraIcon>
            }
          >
            <Avatar
              sx={{
                width: 200,
                height: 200,
                mb: 1.5,
                border: "5px solid",
                borderColor: "third.main",
              }}
              src={image}
            ></Avatar>
          </Badge>
          <Grid item xs={12}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              {username}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="text.secondary" variant="h4" fontStyle="italic">-{email}-</Typography>
          </Grid>
        </Grid>
        <Grid container width="100%" rowSpacing={3} sx={{marginTop:"10px"}}>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              color="secondary.main"
              fontFamily={Font.title}
            >
              Location
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Typography
              variant="h5"
              color="secondary.main"
              fontFamily={Font.title}
            >
              {location != "" ? location : "No location provided"}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="h5"
              color="secondary.main"
              fontFamily={Font.title}
            >
              Phone Number
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Typography
              variant="h5"
              color="secondary.main"
              fontFamily={Font.title}
            >
              {phoneNumber != "" ? phoneNumber : "No phoneNumber provided"}{" "}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="h5"
              color="secondary.main"
              fontFamily={Font.title}
            >
              ProNoun
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Typography
              variant="h5"
              color="secondary.main"
              fontFamily={Font.title}
            >
              {proNoun != "" ? proNoun : "No pronoun provided"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              color="primary.main"
              fontFamily={Font.title}
            >
              Description
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.primary">
              {description != "" ? description : "No description provided"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
}