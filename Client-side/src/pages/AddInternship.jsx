import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

import customFetch from "../utils/customFetch";
import { CustomForm } from "../components";
import { internshipSchema } from "../../../schemas";
import { useHomeLayoutContext } from "./HomeLayout";
import { useEffect } from "react";


export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const extract = Object.fromEntries(formData);
    try {
      const { data } = await customFetch.post("/internships", extract, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      queryClient.invalidateQueries(["AllInternship"]);
      toast.success("Job added successfully ");
      return redirect(`/internships/${data.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.messageError);
      return redirect(".");
    }
  };
export const loader = (queryClient) => async ({ params }) => {
  try {
    await customFetch.get("/internships/new");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.messageError);
    return redirect("..");
  }
}
const AddInternshipState = {
  title: {
    type: "text",
    autoComplete: "title",
  },
  description: {
    type: "text",
    specialType: "textarea",
    autoComplete: "description",
  },
  area: {
    type: "text",
    autoComplete: "area",
  },
  location: {
    type: "text",
    autoComplete: "location",
  },
  company: {
    type: "text",
    autoComplete: "company",
  },
  state: {
    type: "text",
    specialType: "select",
    autoComplete: "state",
  },
  link: {
    type: "text",
    autoComplete: "link",
  },
  salary: {
    type: "number",
    autoComplete: "salary",
    specialType: "currency",
  },
  image:{
    type: "file",
    specialType: "file",
    autoComplete: "images",
    notRequired: true,
  },
  generate: {
    type: "text",
    specialType:"checkbox",
    autoComplete: "generate",
    notRequired: true,
  },
};
const AddInternship = () => {
  return (
    <CustomForm
      initialState={AddInternshipState}
      Schema={internshipSchema}
      title="New Internship"
      Icon={<CreateNewFolderIcon />}
      navInfo={{
        text: "Back To Internships",
        link: "/internships",
      }}
      encrypt={true}
      method = "post"
      width= "50vw"
    />
  );
};
export default AddInternship;
