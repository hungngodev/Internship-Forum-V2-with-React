import { useOutletContext } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

import customFetch from "../utils/customFetch";
import { CustomForm } from "../components";
import { internshipSchema } from "../../../schemas";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const extract = Object.fromEntries(formData);
    console.log(extract)
    try {
      const { data } = await customFetch.post("/internships", extract, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      queryClient.invalidateQueries(["AllInternship"]);
      toast.success("Job added successfully ");
      console.log(data)
      return redirect(`/internships/${data.id}`);
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.messageError);
      return error;
    }
  };

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
