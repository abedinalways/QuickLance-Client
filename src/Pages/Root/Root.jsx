import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';

import { Helmet } from 'react-helmet-async';


const Root = () => {
  return (
    <div className='md:mx-6 relative'>
      <Helmet>
        <title>QuickLance||Home</title>
      </Helmet>
      <Navbar />
      
      <div className="min-h-[calc(100vh-290px)]">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Root;