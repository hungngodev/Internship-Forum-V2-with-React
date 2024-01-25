import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";
import {
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
  useLocation,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Loading, NavBar } from "../components";

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
  const navigate = useNavigate();
  // const [isAuthError, setIsAuthError] = useState(false);
  const datauser = useQuery(userQuery).data;
  const navigation = useNavigation();
  const location = useLocation();
  const isPageLoading = navigation.state === "loading";
  let user = datauser? true : false;

  useEffect(() => {
    window.scrollTo(0, 0)
    user = datauser? true : false;
    queryClient.invalidateQueries(["user"]);
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

  // customFetch.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error?.response?.status === 401) {
  //       setIsAuthError(true);
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  // useEffect(() => {
  //   if (!isAuthError) return;
  //   logOutUser();
  // }, [isAuthError]);

  return (
    <HomeLayoutContext.Provider
      value={{
        datauser,
        user,
        logOutUser,
      }}
    >
      <NavBar main={isPageLoading? <Loading/> : <Outlet />} />
    </HomeLayoutContext.Provider>
  );
};
export const useHomeLayoutContext = () => useContext(HomeLayoutContext);
export default HomeLayout;
