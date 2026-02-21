import { useState } from 'react'
import { BiSolidBookReader } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { studentLogin } from '../features/Users/loggedUserSlice';
import { toast } from 'react-toastify';
import { GrDashboard } from 'react-icons/gr';
import { IoIosCreate } from 'react-icons/io';
import { SiGoogleanalytics, SiGoogletagmanager } from 'react-icons/si';
import { RiLogoutCircleRFill, RiMenuUnfoldFill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';

function SideBar() {

  const loggedUser = useSelector(state => state.loggedUser.loggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    try {
      dispatch(studentLogin(null));
      toast.info("You are logged out!");
      navigate("/");
      setIsOpen(false)
    } catch (error) {
      toast.error("Problem logging out!");
    }
  }

  return (
    <div>
      {loggedUser ? (
        <div className="md:hidden flex z-50 absolute left-2 top-6 hover:text-indigo-300">
          {isOpen ? (
            <div onClick={() => setIsOpen(false)}>
              <RxCross2 className="size-5" />
            </div>
          ) : (
            <div onClick={() => setIsOpen(true)}>
              <RiMenuUnfoldFill className="size-5" />
            </div>
          )}
        </div>
      ) : null}

      {isOpen ? (
        <div className="md:hidden flex flex-col w-full bg-indigo-100/80 justify-center items-center z-10 absolute p-4 top-20 ">
          <>
            <div className="flex gap-2 text-2xl font-bold justify-center items-center  mt-4">
              <BiSolidBookReader />
              <h1>EduTrack</h1>
            </div>

            <ul className="flex flex-col gap-4 md:text-xl sm:text-md text-sm  justify-center mt-3  items-start">
              <NavLink
                onClick={() => setIsOpen(false)}
                to={`/dashboard`}
                className={({ isActive }) =>
                  `flex gap-2 justify-center items-center ${isActive ? "underline" : ""}`
                }
              >
                <GrDashboard />
                Dashboard
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to={`/create`}
                className={({ isActive }) =>
                  `flex gap-2 justify-center items-center ${isActive ? "underline" : ""}`
                }
              >
                <IoIosCreate />
                Create New Task
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to={`/manage`}
                className={({ isActive }) =>
                  `flex gap-2 justify-center items-center ${isActive ? "underline" : ""}`
                }
              >
                <SiGoogletagmanager />
                Manage Tasks
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
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
        </div>
      ) : null}

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
    </div>
  );
}

export default SideBar