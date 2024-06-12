import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';

const App = () => {


  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default App;