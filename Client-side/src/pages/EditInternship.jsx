import EditIcon from "@mui/icons-material/Edit";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useTheme } from "@mui/material/styles";
import Image from "mui-image";
import { useRef, useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import { Box, Grid, Typography, Button } from "@mui/material";
import { internshipSchema } from "../../../schemas";
import { CustomForm } from "../components";
import { FormCheckBox } from "../components/FormComponents";
import customFetch from "../utils/customFetch";
import Font from "../utils/FontConfiguration";

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { data } = await customFetch.get(`/internships/${params.id}/edit`);
      return data.internship;
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
  const deletingImageRef= useRef([]);
  const imagesURLRef = useRef([]);
  const [checked, setChecked] = useState({});
  const handleCheck = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
    if (event.target.checked){
      deletingImageRef.current[event.target.name].style.border = "20px solid";
      deletingImageRef.current[event.target.name].style.borderColor =theme.palette.primary.main;
    }
    else{
      deletingImageRef.current[event.target.name].style.border = "";
    }
  };
  const ImageURl = (
    <Grid
      container
      display="flex"
      alignItems="center"
      flexDirection="column"
      rowSpacing={4}
      sx={{ marginTop: "5vh"}}
    >
      <Grid item xs={12} display="flex" justifyContent="center">
        <Typography variant="h5" color="info.light" fontFamily={Font.subtitle}>
          Select Images to Delete
        </Typography>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <ImageList
          sx={{ width: 1000, height: 450 }}
          variant="masonary"
          cols={3}
          gap={2}
        >
          {images.map((item, i) => {
            const itemName = `imagesNotURL.` + i;
            return (
            <FormCheckBox
              key={i}
              checked={checked[itemName]}
              onChange={handleCheck}
              LabelComponent={
                <ImageListItem key={i}>
                  <Box
                    ref={(el) => {
                      deletingImageRef.current[itemName] = el;
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
              name={itemName}
              color="inherit"
              display="none"
            />
          )})}
          {imagesURL.map((item, i) => {
            const item2Name= `imagesURL.` + i;
            return (
            <FormCheckBox
              key={i + images.length}
              checked={checked[item2Name]}
              onChange={handleCheck}
              LabelComponent={
                <ImageListItem key={i}>
                  <Box
                    ref={(el) => {
                      deletingImageRef.current[item2Name] = el;
                    }}
                    // onClick={(e) => {
                    //   if (imagesURLRef.current[i].style.border != "")
                    //     imagesURLRef.current[i].style.border = "";
                    //   else {
                    //     imagesURLRef.current[i].style.border =
                    //       "20px solid black";
                    //     imagesURLRef.current[i].style.borderColor =
                    //       theme.palette.text.primary;
                    //   }
                    // }}
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
              name={item2Name}
              color="inherit"
              display="none"
            />
          )})}
        </ImageList>
      </Grid>

      <Button
        variant="outlined"
        sx={{ width: "100%", marginTop: "10px" }}
        color="error"
        onClick={() => {
          const newChecked = {};
          for (let i=0; i< images.length; i++){
            const name = `imagesNotURL.` + i;
            newChecked[name]=true;
            deletingImageRef.current[name].style.border = "20px solid";
            deletingImageRef.current[name].style.borderColor =theme.palette.primary.main;
          }
          for (let i = 0; i < imagesURL.length; i++) {
            const name = `imagesURL.` + i;
            newChecked[name] = true;
            deletingImageRef.current[name].style.border = "20px solid";
            deletingImageRef.current[name].style.borderColor =theme.palette.primary.main;
          }
          setChecked(newChecked);
        }}
      >
        Delete All
      </Button>
    </Grid>
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
        OptionalFormComponent={
          images.length + imagesURL.length > 0 ? ImageURl : null
        }
      />
    </>
  );
};
export default EditInternship;
