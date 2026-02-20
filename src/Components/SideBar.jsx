import React from 'react'
import { BiSolidBookReader } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { studentLogin } from '../features/Users/loggedUserSlice';
import { toast } from 'react-toastify';
import { GrDashboard } from 'react-icons/gr';
import { IoIosCreate } from 'react-icons/io';
import { SiGoogleanalytics, SiGoogletagmanager } from 'react-icons/si';
import { RiLogoutCircleRFill } from 'react-icons/ri';

function SideBar() {

  const loggedUser = useSelector(state => state.loggedUser.loggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    try {
      dispatch(studentLogin(null));
      toast.info("You are logged out!");
      navigate("/");
    } catch (error) {
      toast.error("Problem logging out!");
    }
  }

  return (
    <div
      className={`bg-indigo-500 text-white md:w-[45vh] h-screen md:flex md:flex-col  ${loggedUser ? `justify-start items-center` : `justify-center`} items-center hidden shadow-lg`}
    >
      {!loggedUser ? (
        <div
          className={`flex gap-2 text-2xl font-bold justify-center  items-center`}
        >
          <BiSolidBookReader />
          <h1>EduTrack</h1>
        </div>
      ) : (
        <>
          <div className="flex gap-2 text-2xl font-bold justify-start items-center  mt-4">
            <BiSolidBookReader />
            <h1>EduTrack</h1>
          </div>

          <ul className="flex flex-col gap-4 md:text-xl sm:text-md text-sm  justify-center mt-20 items-start">
            <NavLink
              to={`/dashboard`}
              className={({ isActive }) =>
                `flex gap-2 justify-center items-center ${isActive ? "underline" : ""}`
              }
            >
              <GrDashboard />
              Dashboard
            </NavLink>
            <NavLink
              to={`/create`}
              className={({ isActive }) =>
                `flex gap-2 justify-center items-center ${isActive ? "underline" : ""}`
              }
            >
              <IoIosCreate />
              Create New Task
            </NavLink>
            <NavLink
              to={`/manage`}
              className={({ isActive }) =>
                `flex gap-2 justify-center items-center ${isActive ? "underline" : ""}`
              }
            >
              <SiGoogletagmanager />
              Manage Tasks
            </NavLink>
            <NavLink
              to={`/analysis`}
              className={({ isActive }) =>
                `flex gap-2 justify-center items-center ${isActive ? "underline" : ""}`
              }
            >
              <SiGoogleanalytics />
              Analysis
            </NavLink>
            <button
              className={`flex gap-2 justify-center items-center cursor-pointer hover:underline `}
              onClick={handleLogout}
            >
              <RiLogoutCircleRFill />
              Logout
            </button>
          </ul>
        </>
      )}
    </div>
  );
}

export default SideBar