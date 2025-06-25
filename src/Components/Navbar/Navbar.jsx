import React, { use } from 'react';
import { FaHome } from 'react-icons/fa';
import { MdMenuOpen } from 'react-icons/md';
import { GoTasklist } from 'react-icons/go';
import { MdAddTask } from 'react-icons/md';
import { TbSubtask } from 'react-icons/tb';
import { NavLink } from 'react-router';
import logo from '../../assets/freelance (2).png';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle'
const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success('Log Out Successfully');
      })
      .catch(error => console.log(error));
  };

  const nav = (
    <>
      <NavLink
        to="/login"
        className="btn bg-white text-blue-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-blue-500 hover:text-white px-6 lg:hidden mb-2"
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className="btn btn-ghost bg-white text-blue-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-blue-500 hover:text-white px-3 lg:hidden mb-2"
      >
        SingUp
      </NavLink>
      <hr />
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'text-orange-600 font-extrabold text-2xl underline' : ''
        }
      >
        {' '}
        <ul className="menu menu-horizontal px-1">
          <li className=" list-none">
            <span>
              <FaHome />
              Home
            </span>
          </li>
        </ul>
      </NavLink>
      <NavLink
        to="/addTask"
        className={({ isActive }) =>
          isActive ? 'text-orange-600 font-extrabold underline' : ''
        }
      >
        {' '}
        <ul className="menu menu-horizontal">
          <li className=" list-none">
            <span>
              {' '}
              <MdAddTask />
              Add-Task
            </span>
          </li>
        </ul>
      </NavLink>
      <NavLink
        to="/browseTask"
        className={({ isActive }) =>
          isActive ? 'text-orange-600 font-extrabold underline' : ''
        }
      >
        {' '}
        <ul className="menu menu-horizontal">
          <li className="list-none">
            <span>
              <GoTasklist />
              Browse-Tasks
            </span>
          </li>
        </ul>
      </NavLink>
      <NavLink
        to="/postedTasks"
        className={({ isActive }) =>
          isActive ? 'text-orange-600  font-extrabold underline' : ''
        }
      >
        {' '}
        <ul className="menu menu-horizontal">
          <li className="list-none">
            <span>
              <TbSubtask />
              Posted-Tasks
            </span>
          </li>
        </ul>
      </NavLink>
    </>
  );

  const navEnd = (
    <div className="flex gap-2">
      {user ? (
        <>
          <NavLink
            onClick={handleSignOut}
            to="/login"
            className="btn bg-gray-400 text-cyan-200 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-cyan-200 hover:text-white px-6 hidden"
          >
            Logout
          </NavLink>
        </>
      ) : (
        <NavLink
          to="/login"
          className="btn bg-white text-blue-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-blue-500 hover:text-white px-6 lg:flex hidden"
        >
          Login
        </NavLink>
      )}

      {user ? (
        <>
         
          <div className="dropdown dropdown-hover">
            <div tabIndex={0}>
              <button className="btn btn-circle w-10">
                <img
                  src={user?.photoURL}
                  className="w-8 h-8 rounded-full mt-1"
                />
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-30 md:mr-40 shadow-sm"
            >
              <li className="text-orange-600 font-bold font-[sora] text-[12px] mt-3 ml-4 md:flex">
                {user?.displayName}
              </li>
              <li>
                <NavLink
                  onClick={handleSignOut}
                  to="/login"
                  className="btn bg-blue-600 text-cyan-200 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-cyan-200 hover:text-blue-800 px-6"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>{' '}
        </>
      ) : (
        <NavLink
          to="/register"
          className="btn bg-white text-blue-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-blue-500 hover:text-white px-3 lg:flex hidden"
        >
          SingUp
        </NavLink>
      )}
    </div>
  );

  return (
    <div className="navbar md:w-full flex items-center sticky top-0 z-100 bg-yellow-100  rounded-xl shadow-md">
      <div className="navbar-start flex items-center">
        {/* drawer menu */}
        <div className="drawer lg:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn btn-circle bg-blue-700 drawer-button"
            >
              <MdMenuOpen />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              {nav}
            </ul>
          </div>
        </div>
        <h1 className="font-[sora] font-extrabold text-lg flex items-center-safe">
          <img src={logo} alt="" />
          <span className="text-orange-600">Quick</span>
          <span className="text-cyan-600">Lance</span>
        </h1>
      </div>
      <div className="navbar-center justify-center items-center">
        <div className="lg:flex hidden text-md ml-6 font-bold text-purple-400 font-[sora] ">
          {nav}
        </div>
        <div className="lg:hidden flex-col ml-20">
          <ThemeToggle />
          {navEnd}
        </div>
      </div>
      <div className="navbar-end mx-4 lg:flex hidden">
        {navEnd}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
