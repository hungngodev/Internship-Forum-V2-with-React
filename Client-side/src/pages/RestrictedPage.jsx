import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const RestrictedPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.warning("You cannot go to that page");
    navigate("..");
  },[]);
};
export default RestrictedPage;
