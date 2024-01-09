import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ToastContainer } from 'react-toastify';
import App from './App.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App/>
    <ToastContainer position='top-center' />
  </>
);
