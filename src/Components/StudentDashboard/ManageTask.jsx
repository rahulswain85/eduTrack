import React from 'react'
import { AiOutlineRise } from 'react-icons/ai';
import { useSelector } from 'react-redux'

function ManageTask() {
  const taskSelector = useSelector(state => state.tasks.tasks);
  const currentUser = useSelector(state => state.loggedUser.loggedUser);
  const currentUserTasks = taskSelector.filter(task => task.studentId == currentUser.studentId);

  const highPriorityTasks = currentUserTasks.filter(
    (task) => task.taskPriority == "High");
  const lowPriorityTasks = currentUserTasks.filter(
    (task) => task.taskPriority == "Low",
  );
  const mediumPriorityTasks = currentUserTasks.filter(
    (task) => task.taskPriority == "Medium",
  );

  return (
    <div className="w-full bg-indigo-100 flex flex-col gap-4 items-center h-screen p-4">
      <h1 className="text-2xl font-bold bg-indigo-500 w-full px-3 py-1 text-white text-center">
        Manage Task
      </h1>

      <div className="rounded-2xl bg-white w-full min-h-[80vh] flex md:flex-row flex-col gap-4 p-4">
        <div className="md:w-[33%] w-full md:min-h-full min-h-[30%] bg-red-200 flex flex-col gap-4 p-4 items-center">
          <h1 className="text-center font-bold text-2xl">High Priority</h1>
          {highPriorityTasks.map((task) => (
            <div
              key={task.taskId}
              className="bg-white w-full p-4 h-full flex flex-col border-l-5 inset-shadow-sm/10 border-indigo-400 gap-2 rounded-2xl shadow hover:shadow-md justify-baseline items-start"
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

        <div className="md:w-[33%] w-full md:min-h-full min-h-[30%] bg-amber-200 flex flex-col gap-4 p-4 items-center">
          <h1 className="text-center font-bold text-2xl">Medium Priority</h1>
          {mediumPriorityTasks.map((task) => (
            <div
              key={task.taskId}
              className="bg-white w-full p-4 h-full flex flex-col border-l-5 inset-shadow-sm/10 border-indigo-400 gap-2 rounded-2xl shadow hover:shadow-md justify-baseline items-start"
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

        <div className="md:w-[33%] w-full md:min-h-full min-h-[30%] bg-green-200 flex flex-col gap-4 p-4 items-center">
          <h1 className="text-center font-bold text-2xl">Medium Priority</h1>
          {lowPriorityTasks.map((task) => (
            <div
              key={task.taskId}
              className="bg-white w-full p-4 h-full flex flex-col border-l-5 inset-shadow-sm/10 border-indigo-400 gap-2 rounded-2xl shadow hover:shadow-md justify-baseline items-start"
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
    </div>
  );
}

export default ManageTask