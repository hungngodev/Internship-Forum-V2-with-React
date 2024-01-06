import { Outlet, redirect, useNavigate, useNavigation } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import Button from '@mui/material/Button';

import NavBar from '../components/NavBar.jsx';

import customFetch from '../utils/customFetch';

import './HomeLayout.css';

const userQuery = {
  queryKey: [],
  queryFn: async () => {
    const { data } = await customFetch.get('/');
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect('/');
  }
};

const HomeLayoutContext= createContext();

const HomeLayout = ({queryClient}) => {

  const datauser= useQuery(userQuery).data;


  const navigate = useNavigate();
  const [isAuthError, setIsAuthError] = useState(false);
  const [user, setUser] = useState(datauser? true: false);
  const [BodyConfig, changeBodyConfig] = useState({});
  

  function refreshPage() {
    window.location.reload();
  }

  const logOutUser = async () => {
    await customFetch.get('/logout');
    setUser(false);
    toast.success('Logged out successfully');
  };
  
  
  const notify = () =>   toast.success('Logged out successfully');
  return (
    <HomeLayoutContext.Provider
    value={{
      user,
      setUser,
      logOutUser,
      BodyConfig,
      changeBodyConfig
    }}>
    <NavBar main = {<Outlet/>} />

    </HomeLayoutContext.Provider>
  );
};
export const useHomeLayoutContext = () => useContext(HomeLayoutContext);
export default HomeLayout;
