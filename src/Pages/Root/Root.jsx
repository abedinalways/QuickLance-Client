import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import ThemeToggle from '../../Components/ThemeToggle/ThemeToggle';

const Root = () => {
  return (
    <>
      <div className="flex ">
        <Navbar />
        
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;