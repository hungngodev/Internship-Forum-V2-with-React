import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useHomeLayoutContext } from "./HomeLayout";

const SingleInternshipQuery = (id) => {
  return {
    queryKey: ["SingleInternship", id],
    queryFn: async () => {
      let requestData = await customFetch.get(`/internships/${id}`);
      return requestData.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(SingleInternshipQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/internships");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    try {
      const { id } = params;
      await customFetch.delete(`/internships/${id}`);
      toast.warn("Internship Deleted!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      queryClient.invalidateQueries();
      return redirect("/internships");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.messageError);
      return redirect("..");
    }
  };

const DeleteInternship = () => {
  const id = useLoaderData();
  const SingleInternship = useQuery(SingleInternshipQuery(id)).data.internship;
  const { author } = SingleInternship;
  const { datauser, user } = useHomeLayoutContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!(user && datauser._id == author._id)) {
      navigate("..");
      toast.warn("You do not have permission to delete this internship");
    }
    console.log(datauser, author);
  });
};
export default DeleteInternship;
