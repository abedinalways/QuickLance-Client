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
        <title>QuickLance||Home</title>
      </Helmet>
      <div className="flex md:gap-6 gap-4">
        <Navbar />
        <ThemeToggle />
      </div>
      <div className="min-h-[calc(100vh-290px)]">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
};

export default Root;