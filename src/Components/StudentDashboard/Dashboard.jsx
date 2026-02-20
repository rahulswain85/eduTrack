import React, { useEffect, useState } from 'react'
import { AiOutlineRise } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { updateStatus } from '../../features/Tasks/taskSlice';
import { toast } from 'react-toastify';

function Dashboard() {
  const loggedUser = useSelector(state => state.loggedUser.loggedUser);
  const taskSelector = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  
  const totalTasks = taskSelector.filter(task => task.studentId === loggedUser.studentId,
    
  ).length;

  const pendingTasks = taskSelector.filter(
    (task) =>
      task.studentId === loggedUser.studentId && task.taskStatus === "Pending",
  ).length

  const inProgressTasks = taskSelector.filter(
    (task) =>
      task.studentId === loggedUser.studentId && task.taskStatus === "In Progress",
  ).length;

  const completedTasks = taskSelector.filter(
    (task) =>
      task.studentId === loggedUser.studentId && task.taskStatus === "Completed",
  ).length;

  const currentStudentTasks = () => {
    const studentTickets = taskSelector.filter(task => task.studentId === loggedUser.studentId);
    return studentTickets
  }

  console.log(currentStudentTasks());
  
  function handleStatusChange(id, status) {

    try {
      dispatch(updateStatus({ id, status }));
      toast.success('Task status updated');
    } catch (error) {
      toast.error('Failed to update the status');
      console.log(error);
    }
  }
    
    

  return (
    <>
      <div className="flex flex-col gap-2 flex-wrap justify-center items-center h-full">
        <div className="flex-1 flex flex-row justify-around items-center bg-amber-50 w-full p-4">
          <h1 className="md:text-2xl text-lg font-bold">Dashboard</h1>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">Welcome</p>
            <p className="italic">{loggedUser.name}</p>
          </div>
        </div>
        <div className="flex-5 bg-indigo-50 w-full">
          <div className="flex md:flex-row gap-3 flex-col flex-wrap w-full p-4 justify-center items-center">
            <div className="flex flex-col flex-wrap bg-indigo-400 md:w-[20%] shadow inset-shadow-sm/20 w-full min-h-[20vh] p-4 rounded-2xl">
              <p className="md:text-4xl lg:text-3xl text-xl font-bold">{totalTasks}</p>
              <p>Total Tasks</p>
            </div>

            <div className="flex flex-col flex-wrap bg-pink-300 md:w-[20%] shadow inset-shadow-sm/20 w-full min-h-[20vh] p-4 rounded-2xl">
              <p className="md:text-4xl lg:text-3xl text-xl font-bold">{pendingTasks}</p>
              <p>Pending</p>
            </div>
            <div className="flex flex-col flex-wrap bg-green-300 md:w-[20%] shadow inset-shadow-sm/20 w-full min-h-[20vh] p-4 rounded-2xl">
              <p className="md:text-4xl lg:text-3xl text-xl font-bold">{inProgressTasks}</p>
              <p>In Progress</p>
            </div>
            <div className="flex flex-col flex-wrap bg-sky-200 md:w-[20%] shadow inset-shadow-sm/20 w-full min-h-[20vh] p-4 rounded-2xl">
              <p className="md:text-4xl lg:text-3xl text-xl font-bold">{completedTasks}</p>
              <p className="text-wrap">Task Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-wrap flex-row gap-3 w-full min-h-[calc(100vh-50vh)] p-6 max-h-[calc(100vh-50vh)] overflow-x-auto rounded-2xl">
          {currentStudentTasks().map((task) => (
            <div
              key={task.taskId}
              className="md:w-[22%] w-full p-4 h-full flex flex-col border-l-5 inset-shadow-sm/10 border-indigo-400 gap-2 rounded-2xl shadow hover:shadow-md justify-baseline items-start"
            >
              <p
                className={`flex justify-center items-center gap-4 font-bold text-lg`}
              >
                {task.taskPriority}
                <AiOutlineRise
                  className={`bg-indigo-800 font-extrabold rounded-full p-1 size-6 ${task.taskPriority === "High" ? `text-red-500` : task.taskPriority === "Medium" ? `text-amber-400` : `text-green-500`}`}
                />
              </p>
              <hr className="w-full " />
              <p className="text-2xl font-bold text-indigo-500">
                {task.taskTitle}
              </p>
              <p className="italic font-semibold">{task.taskDueDate}</p>
              <select
                onChange={(e) =>
                  handleStatusChange(task.taskId, e.target.value)
                }
                value={task.taskStatus}
                className={` w-full p-1 mt-2 rounded-2xl inset-shadow-sm/20 font-semibold self-baseline ${task.taskStatus === "Pending" ? `bg-red-100` : task.taskStatus === "In Progress" ? `bg-amber-100` : `bg-green-100`}`}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

  export default Dashboard