import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

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
      toast.error(error?.response?.data?.messageError);
      return redirect("..");
    }
  };

const DeleteInternship = () => {
};
export default DeleteInternship;
