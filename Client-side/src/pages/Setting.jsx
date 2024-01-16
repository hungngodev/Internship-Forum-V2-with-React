import { useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { CssBaseline } from "@mui/material";

import { customFetch } from "../utils";
import { useHomeLayoutContext } from "./HomeLayout";
import { CustomForm, EditButton, UserInfoPage } from "../components";
import { SettingSchema } from "../../../schemas";
import Font from "../utils/FontConfiguration";

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { data } = await customFetch.get("/setting");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.messageError);
      return redirect("..");
    }
  };
export default function Setting() {
  const { user } = useLoaderData();
  const {
    username,
    email,
    description,
    location,
    phoneNumber,
    proNoun,
    image,
  } = user;
  const SettingState = {
    username: {
      type: "text",
      autoComplete: "username",
      defaultValue: username,
      toast:
        "If change username you will be logged out, then you will have to log in again",
    },
    NewPassword: {
      type: "password",
      autoComplete: "current-password",
      toast:
        "For security reason, you cannot view your original password, but you can change it",
      notRequired: true,
    },
    email: {
      type: "email",
      autoComplete: "email",
      defaultValue: email,
    },
    description: {
      type: "text",
      specialType: "textarea",
      autoComplete: "description",
      notRequired: true,
      defaultValue: description,
    },
    location: {
      type: "text",
      autoComplete: "location",
      defaultValue: location,
      notRequired: true,
    },
    phoneNumber: {
      type: "text",
      autoComplete: "phoneNumber",
      defaultValue: phoneNumber,
      notRequired: true,
    },
    proNoun: {
      type: "text",
      autoComplete: "proNoun",
      defaultValue: proNoun,
      notRequired: true,
    },

    imageLink: {
      type: "text",
      autoComplete: "link",
      toast:
        "You can choose to upload image as link below or upload image from your device",
      notRequired: true,
    },
    image: {
      type: "file",
      specialType: "file",
      autoComplete: "images",
      notRequired: true,
      toast: "This image uploading will be prioritized over image link above",
    },
    generate: {
      type: "text",
      specialType:"checkbox",
      autoComplete: "generate",
      notRequired: true,
    },
  };
  const [showForm, setShowForm] = React.useState(false);
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={3}
      >
        <Grid item xs={12} sx={{width:"80rem"}}>
          <UserInfoPage {...user} />
        </Grid>
        <Grid item xs={12}>
          <EditButton onClick={() => setShowForm(!showForm)} />
        </Grid>
        {showForm && (
        <Grid item xs={12}>
          <CustomForm
            initialState={SettingState}
            Schema={SettingSchema}
            title="Manage"
            Icon={<ManageAccountsIcon />}
            navInfo={{
              text: "Back To Internships",
              link: "/internships",
            }}
            encrypt={true}
            method="post"
            width="50vw"
            action="/setting/edit"
          />
        </Grid>
      )}
      </Grid>
    </>
  );
}
