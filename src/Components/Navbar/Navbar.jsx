import React, { use } from 'react';
import { FaHome } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { GoTasklist } from 'react-icons/go';
import { MdAddTask } from 'react-icons/md';
import { TbSubtask } from 'react-icons/tb';
import { NavLink } from 'react-router';
import logo from '../../assets/freelance (2).png';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';

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
        to="/register"
        className="btn btn-ghost bg-white text-blue-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-blue-500 hover:text-white px-6 md:hidden mb-2"
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
          <li className="px-4 list-none">
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
          <li className="px-4 list-none">
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
          <li className="px-4 list-none">
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
          <li className="px-4 list-none">
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
          className="btn bg-white text-blue-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-blue-500 hover:text-white px-6"
        >
          Login
        </NavLink>
      )}

      {user ? (
        <>
          {' '}
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
          className="btn bg-white text-blue-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-blue-500 hover:text-white px-6 hidden md:flex"
        >
          SingUp
        </NavLink>
      )}
    </div>
  );

  return (
    <div className="navbar sticky top-0 z-100  md:w-full">
      <div className="navbar-start flex items-center md:mx-10">
        <div className="dropdown md:hidden">
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn m-1">
              <IoMdArrowDropdown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              {nav}
            </ul>
          </div>
        </div>
        <h1 className="md:font-[Suse] font-extrabold md:text-2xl text-lg flex items-center-safe">
          <img src={logo} alt="" />
          <span className="text-orange-600">Quick</span>
          <span className="text-cyan-600">Lance</span>
        </h1>
      </div>
      <div className="navbar-center justify-center items-center gap-4 ">
        <div className="md:flex hidden text-2xl font-bold text-yellow-600 font-[sora]">
          {nav}
        </div>
        <div className="md:hidden flex-col ml-20">{navEnd}</div>
      </div>
      <div className="navbar-end mx-20 md:flex hidden">{navEnd}</div>
    </div>
  );
};

export default Navbar;
