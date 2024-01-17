import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Image } from "mui-image";
import * as React from "react";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import { SettingSchema } from "../../../schemas";
import settingDark from "../assets/images/setting/settingDark.svg";
import settingLight from "../assets/images/setting/settingLight.svg";
import { CustomForm, EditButton, UserInfoPage } from "../components";
import Wrapper from "../css/Setting";
import { customFetch } from "../utils";

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
      autoComplete: "phone number",
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
      specialType: "checkbox",
      autoComplete: "generate",
      notRequired: true,
    },
  };
  const [showForm, setShowForm] = React.useState(false);
  const theme = useTheme();
  const darkTheme = theme.palette.mode === "dark";
  return (
    <Wrapper>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={3}
      >
        <Grid
          item
          xs={12}
          sx={{ width: "60vw" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {!showForm && <UserInfoPage {...user} />}
        </Grid>
        <Grid item xs={12} sx={{ position: "relative" }}>
          <EditButton
            onClick={() => setShowForm(!showForm)}
            insideComponent={showForm ? "Cancel" : "Edit"}
          />
        </Grid>
        {showForm && (
          <Grid container>
            <Grid item xs={12} md={6}>
              <CustomForm
                initialState={SettingState}
                Schema={SettingSchema}
                title="Manage"
                Icon={<ManageAccountsIcon />}
                navInfo={{
                  text: "Back to Setting",
                  link: "/setting",
                }}
                encrypt={true}
                method="post"
                width="40vw"
                action="/setting/edit"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
            >
              <MouseParallaxContainer className="parallax" resetOnLeave>
                <MouseParallaxChild factorX={0.02} factorY={0.02}>
                  <Image
                    src={darkTheme ? settingDark : settingLight}
                    alt="register"
                    height="auto"
                    width="45vw"
                    easing="cubic-bezier(0.25, 0.1, 0.25, 1.0)"
                  />
                </MouseParallaxChild>
              </MouseParallaxContainer>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Wrapper>
  );
}
