import {toast} from "react-toastify";
import {redirect} from "react-router-dom";
import { validateImage } from "image-validator";

import {customFetch} from "../utils";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const extract = Object.fromEntries(formData);
    const imageValidation = await validateImage(extract.imageLink)
    if (!imageValidation && extract.imageLink!=""){
        toast.error("Image Link is not valid");
        return redirect("..")
    }
    try {
      const { data } = await customFetch.post("/setting/edit", extract, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      queryClient.invalidateQueries();
      toast(`You have changed your account`);
      return redirect("..");
    } catch (error) {
        queryClient.invalidateQueries();
      toast.error(error?.response?.data?.messageError);
      return redirect("..");
    }
  };
