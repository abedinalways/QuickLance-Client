import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import ThemeToggle from '../../Components/ThemeToggle/ThemeToggle';
import { Helmet } from 'react-helmet-async';


const Root = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="flex md:gap-6 gap-4">
        <Navbar />
        <ThemeToggle/>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;