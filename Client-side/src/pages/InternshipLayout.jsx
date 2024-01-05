import { Outlet, redirect, useNavigate, useNavigation } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import Button from '@mui/material/Button';


const InternshipLayout = () => {
    const test=[]
    for (let i = 0; i < 1000; i++) {
      test.push(<div key={i}>layout</div>)
    }
    return (
      <div>
      <Outlet/>
      </div>
    );
  };
  
  export default InternshipLayout;
  