import { useState } from 'react';
import { BiSolidBookReader } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/Users/authSlice';
import { clearTasks } from '../features/Tasks/taskApiSlice';
import { toast } from 'react-toastify';
import { GrDashboard } from 'react-icons/gr';
import { IoIosCreate } from 'react-icons/io';
import { SiGoogleanalytics } from 'react-icons/si';
import { RiLogoutCircleRFill, RiMenuUnfoldFill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { MdListAlt } from 'react-icons/md';

const navLinkClass = ({ isActive }) =>
  `flex gap-2 justify-center items-center py-2 px-4 rounded-xl transition hover:bg-indigo-600/20 ${isActive ? 'bg-indigo-600/30 font-semibold' : ''}`;

function SideBar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(clearTasks());
      toast.info('You are logged out!');
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      toast.error('Problem logging out!');
    }
  }

  return (
    <div>
      {user && (
        <div className="md:hidden flex z-50 absolute left-2 top-6 hover:text-indigo-600 transition">
          {isOpen ? (
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <RxCross2 className="size-6" />
            </button>
          ) : (
            <button type="button" onClick={() => setIsOpen(true)} aria-label="Open menu">
              <RiMenuUnfoldFill className="size-6" />
            </button>
          )}
        </div>
      )}

      {isOpen && (
        <div className="md:hidden flex flex-col w-full bg-indigo-100/95 backdrop-blur-sm justify-center items-center z-10 absolute p-4 top-20 rounded-2xl mx-2 shadow-lg border border-indigo-200">
          <div className="flex gap-2 text-xl font-bold justify-center items-center mt-4 text-indigo-800">
            <BiSolidBookReader className="size-8" />
            <h1>EduTrack</h1>
          </div>
          <nav className="flex flex-col gap-2 w-full mt-4">
            <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={navLinkClass}>
              <GrDashboard className="size-5" />
              Dashboard
            </NavLink>
            <NavLink to="/create" onClick={() => setIsOpen(false)} className={navLinkClass}>
              <IoIosCreate className="size-5" />
              Create Task
            </NavLink>
            <NavLink to="/manage" onClick={() => setIsOpen(false)} className={navLinkClass}>
              <MdListAlt className="size-5" />
              Manage Tasks
            </NavLink>
            <NavLink to="/all-tasks" onClick={() => setIsOpen(false)} className={navLinkClass}>
              <MdListAlt className="size-5" />
              All Tasks
            </NavLink>
            <NavLink to="/analysis" onClick={() => setIsOpen(false)} className={navLinkClass}>
              <SiGoogleanalytics className="size-5" />
              Analysis
            </NavLink>
            <button
              type="button"
              className="flex gap-2 justify-center items-center py-2 px-4 rounded-xl hover:bg-red-100 hover:text-red-700 transition w-full text-left"
              onClick={handleLogout}
            >
              <RiLogoutCircleRFill className="size-5" />
              Logout
            </button>
          </nav>
        </div>
      )}

      <div
        className={`bg-gradient-to-b from-indigo-600 to-indigo-700 text-white md:w-64 min-w-64 h-screen md:flex md:flex-col shadow-xl ${
          user ? 'justify-start items-center' : 'justify-center items-center'
        } hidden`}
      >
        {!user ? (
          <div className="flex gap-2 text-2xl font-bold justify-center items-center">
            <BiSolidBookReader className="size-10" />
            <h1>EduTrack</h1>
          </div>
        ) : (
          <>
            <div className="flex gap-2 text-xl font-bold justify-start items-center mt-8 px-4">
              <BiSolidBookReader className="size-9" />
              <h1>EduTrack</h1>
            </div>
            <nav className="flex flex-col gap-1 mt-12 w-full px-3">
              <NavLink to="/dashboard" className={navLinkClass}>
                <GrDashboard className="size-5" />
                Dashboard
              </NavLink>
              <NavLink to="/create" className={navLinkClass}>
                <IoIosCreate className="size-5" />
                Create Task
              </NavLink>
              <NavLink to="/manage" className={navLinkClass}>
                <MdListAlt className="size-5" />
                Manage Tasks
              </NavLink>
              <NavLink to="/all-tasks" className={navLinkClass}>
                <MdListAlt className="size-5" />
                All Tasks
              </NavLink>
              <NavLink to="/analysis" className={navLinkClass}>
                <SiGoogleanalytics className="size-5" />
                Analysis
              </NavLink>
              <button
                type="button"
                className="flex gap-2 justify-center items-center py-2 px-4 rounded-xl hover:bg-indigo-500/50 transition w-full text-left mt-4"
                onClick={handleLogout}
              >
                <RiLogoutCircleRFill className="size-5" />
                Logout
              </button>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;
