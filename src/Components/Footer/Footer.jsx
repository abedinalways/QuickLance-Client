import React from 'react';
import { NavLink } from 'react-router';
import { FaHome, FaTasks } from 'react-icons/fa';


import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { BiTask } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className=" border-t-1 border-blue-300 text-black h-35">
      <div className="flex items-center justify-center py-4 mb-2">
        <h1 className="font-[sora] font-bold text-sm flex items-center-safe text-blue-900">
          <span className="space-x-2">
            Copyright © {new Date().getFullYear()} - All right reserved By
          </span>
          <img src="https://i.ibb.co/216yjMbc/freelance.png" alt="" />
          <span className="text-black">Quick</span>
          <span className="text-black">Lance</span>
        </h1>
      </div>
      <nav className="grid grid-flow-col gap-4 md:gap-6 text-black text-sm md:text-lg font-[sora]">
        <div className="flex gap-2 justify-center items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? ' text-blue-800 font-bold underline' : ''
            }
          >
            {' '}
            <ul className="menu menu-horizontal px-1">
              <li className="px-4 list-none">
                <span>
                  <FaHome />
                  Home
                </span>
              </li>
            </ul>
          </NavLink>
          <NavLink
            to="/browseTask"
            className={({ isActive }) =>
              isActive ? 'text-purple-900 font-bold underline' : ''
            }
          >
            {' '}
            <ul className="menu menu-horizontal">
              <li className="px-4 list-none">
                <span>
                  <FaTasks />
                  Browse-Tasks
                </span>
              </li>
            </ul>
          </NavLink>
          <NavLink
            to="/postedTasks"
            className={({ isActive }) =>
              isActive ? 'text-purple-900  font-bold underline' : ''
            }
          >
            {' '}
            <ul className="menu menu-horizontal">
              <li className="px-4 list-none">
                <span>
                  <BiTask />
                  Posted-Tasks
                </span>
              </li>
            </ul>
          </NavLink>
        </div>
      </nav>

      <div className="flex justify-center items-center gap-4">
        <NavLink to="https://web.facebook.com/Abedin.always" target="_blank">
          <FaFacebook className="text-2xl text-blue-500"></FaFacebook>
        </NavLink>
        <NavLink to="https://www.instagram.com/abedin.always/" target="_blank">
          <FaInstagram className="text-2xl text-red-500"></FaInstagram>
        </NavLink>
        <NavLink to="https://github.com/abedinalways" target="_blank">
          <FaGithub className="text-2xl text-black"></FaGithub>
        </NavLink>
        <NavLink
          to="https://www.linkedin.com/in/sheikh-minhajul-abedin-bb51162a4/"
          target="_blank"
        >
          <FaLinkedin className="text-2xl text-blue-500"></FaLinkedin>
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
