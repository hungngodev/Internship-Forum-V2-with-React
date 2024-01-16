import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post(`/internships/${params.id}/reviews`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      queryClient.invalidateQueries(["SingleInternship", params.id]);
      toast.info("Reviews Created!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return redirect("..");
    } catch (error) { 
      toast.error(error?.response?.data?.messageError);
      return redirect("..");
    }
  };

export default function CreateReview() {
}
