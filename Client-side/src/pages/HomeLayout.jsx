import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import {
  Outlet,
  redirect,
  useLocation,
  useNavigate
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "../components/NavBar.jsx";

import { resetBodyStyle, titleObject } from "../utils";
import customFetch from "../utils/customFetch";

import "./HomeLayout.css";

const userQuery = {
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

const HomeLayoutContext = createContext();

const HomeLayout = ({ queryClient }) => {

  const datauser = useQuery(userQuery).data;
  const navigate = useNavigate();
  const location = useLocation();
  const [Title, changeTitle] = useState("Home Page");
  const [isAuthError, setIsAuthError] = useState(false);
  
  const user = datauser? true : false;

  useEffect(() => {
    let path = location.pathname.includes("profile")? '/profile': location.pathname;
    path = path.includes("internships/")? '/internships/': path;
    resetBodyStyle(path);
    changeTitle(titleObject[path]);
  }, [location]);

  const logOutUser = async () => {
    try {
      await customFetch.get("/logout");
      queryClient.invalidateQueries();
      navigate("/internships");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.response?.data?.messageError);
    }
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logOutUser();
  }, [isAuthError]);

  return (
    <HomeLayoutContext.Provider
      value={{
        datauser,
        user,
        logOutUser,
        Title,
        changeTitle,
      }}
    >
      <NavBar main={<Outlet />} />
    </HomeLayoutContext.Provider>
  );
};
export const useHomeLayoutContext = () => useContext(HomeLayoutContext);
export default HomeLayout;
