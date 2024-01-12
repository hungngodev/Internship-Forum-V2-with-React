import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    try {
      const {id,reviewId} = params;
      await customFetch.delete(`/internships/${id}/reviews/${reviewId}`);
      toast.warn('Review Deleted!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      queryClient.invalidateQueries(["SingleInternship"]);
      return redirect("..");
    } catch (error) {
      console.log(error);
      return redirect("..");
    }
  };
