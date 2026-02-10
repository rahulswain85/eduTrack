import React from 'react'
import { BiSolidBookReader } from "react-icons/bi";

function SideBar() {
  return (
    
    <div className="bg-indigo-500 text-white md:w-[50vh] h-screen md:flex md:flex-col justify-center items-center hidden rounded-r-xl shadow-lg">
      <div className='flex gap-2 text-2xl font-bold justify-center items-center'>
        <BiSolidBookReader />
        <h1>EduTrack</h1>
      </div>
    </div>
  );
}

export default SideBar