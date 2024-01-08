import {
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
  useLocation,
} from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";

import NavBar from "../components/NavBar.jsx";

import customFetch from "../utils/customFetch";
import { resetBodyStyle, titleObject } from "../utils";

import "./HomeLayout.css";
import { set } from "mongoose";

const userQuery = (user) => {
  return {
    queryKey: [user],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  };
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

  const navigate = useNavigate();
  const location = useLocation();
  const [Title, changeTitle] = useState("Home Page");
  const [datauser, setDatauser] = useState(useQuery(userQuery('user')).data);

  const [isAuthError, setIsAuthError] = useState(false);
  const [user, setUser] = useState(datauser ? true : false);

  const gettingUserData = async () => {
    const { data } = await customFetch.get('/');
    if (data?.hasOwnProperty('username')) {
      setDatauser(data);
      setUser(true);
    }
    else{
      setDatauser(null);
    }
  }

  useEffect(() => {
    gettingUserData();
    resetBodyStyle(location.pathname);
    changeTitle(titleObject[location.pathname]);
  }, [location]);

  const logOutUser = async () => {
    try {
      await customFetch.get("/logout");
      setUser(false);
      gettingUserData();
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
    logoutUser();
  }, [isAuthError]);

  return (
    <HomeLayoutContext.Provider
      value={{
        datauser,
        user,
        setUser,
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
