import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import EditIcon from "@mui/icons-material/Edit";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Image from "mui-image";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useTheme } from "@mui/material/styles";

import customFetch from "../utils/customFetch";
import { CustomForm } from "../components";
import { FormCheckBox } from "../components/FormComponents";
import { internshipSchema } from "../../../schemas";
import { Box, Typography } from "@mui/material";
import { useHomeLayoutContext } from "./HomeLayout";


export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const {data} = await customFetch.get(`/internships/${params.id}/edit`);
      return data.internship
    } catch (error) {
      toast.error(error?.response?.data?.messageError);
      return redirect("..");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const { id } = params;
    const formData = await request.formData();
    const extract = Object.fromEntries(formData);
    extract.deleteImagesURL = [];
    extract.deleteImages = [];
    for (let i in extract) {
      if (String(i).includes("imagesURL")) {
        extract.deleteImagesURL.push(extract[i]);
        delete extract[i];
      }
      if (String(i).includes("imagesNotURL")) {
        extract.deleteImages.push(extract[i]);
        delete extract[i];
      }
    }
    try {
      const { data } = await customFetch.put(`/internships/${id}`, extract, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      queryClient.invalidateQueries();
      toast.success("Internship edited successfully ");
      return redirect(`/internships/${data.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.messageError);
      return error;
    }
  };

const EditInternship = () => {
  const theme = useTheme();
  const SingleInternship = useLoaderData();
  const {
    title,
    description,
    location,
    area,
    company,
    salary,
    link,
    lastModified,
    state,
    imagesURL,
    images,
  } = SingleInternship;
  const EditInternshipState = {
    title: {
      type: "text",
      autoComplete: "title",
      defaultValue: title,
    },
    description: {
      type: "text",
      specialType: "textarea",
      autoComplete: "description",
      defaultValue: description,
    },
    area: {
      type: "text",
      autoComplete: "area",
      defaultValue: area,
    },
    location: {
      type: "text",
      autoComplete: "location",
      defaultValue: location,
    },
    company: {
      type: "text",
      autoComplete: "company",
      defaultValue: company,
    },
    state: {
      type: "text",
      specialType: "select",
      autoComplete: "state",
      defaultValue: state,
    },
    link: {
      type: "text",
      autoComplete: "link",
      defaultValue: link,
    },
    salary: {
      type: "number",
      autoComplete: "salary",
      specialType: "currency",
      defaultValue: salary,
    },
    image: {
      type: "file",
      specialType: "file",
      autoComplete: "images",
      notRequired: true,
    },
    generate: {
      type: "text",
      specialType: "checkbox",
      autoComplete: "generate",
      notRequired: true,
    },
  };
  const imagesRef = useRef([]);
  const imagesURLRef = useRef([]);
  const ImageURl = (
    <ImageList
      sx={{ width: 1000, height: 450 }}
      variant="masonary"
      cols={3}
      gap={2}
    >
      {images.map((item, i) => (
        <FormCheckBox
          key={i}
          LabelComponent={
            <ImageListItem key={i}>
              <Box
                ref={(el) => {
                  imagesRef.current[i] = el;
                }}
                onClick={(e) => {
                  if (imagesRef.current[i].style.border != "")
                    imagesRef.current[i].style.border = "";
                  else {
                    imagesRef.current[i].style.border = "20px solid";
                    imagesRef.current[i].style.borderColor = theme.palette.primary.main;
                  }
                }}
              >
                <Image
                  src={item.url}
                  alt="Image Delete Selection"
                  fit="contain"
                  height="100%"
                  width="100%"
                />
              </Box>
            </ImageListItem>
          }
          value={item.filename}
          name={`imagesNotURL.` + i}
          color="inherit"
          display="none"
        />
      ))}
      {imagesURL.map((item, i) => (
        <FormCheckBox
          key={i}
          LabelComponent={
            <ImageListItem key={i}>
              <Box
                ref={(el) => {
                  imagesURLRef.current[i] = el;
                }}
                onClick={(e) => {
                  if (imagesURLRef.current[i].style.border != "")
                    imagesURLRef.current[i].style.border = "";
                  else {
                    imagesURLRef.current[i].style.border = "20px solid black";
                    imagesURLRef.current[i].style.borderColor = theme.palette.text.primary;
                  }
                }}
              >
                <Image
                  src={item}
                  alt="Image Delete Selection"
                  fit="contain"
                  height="100%"
                  width="100%"
                />
              </Box>
            </ImageListItem>
          }
          value={item}
          name={`imagesURL.` + i}
          color="inherit"
          display="none"
        />
      ))}
    </ImageList>
  );
  return (
    <>
      <CustomForm
        initialState={EditInternshipState}
        Schema={internshipSchema}
        title="Edit Internship"
        Icon={<EditIcon />}
        navInfo={{
          text: "Back To Internships",
          link: "/internships",
        }}
        encrypt={true}
        method="post"
        width="50vw"
        OptionalFormComponent={ImageURl}
      />
    </>
  );
};
export default EditInternship;
