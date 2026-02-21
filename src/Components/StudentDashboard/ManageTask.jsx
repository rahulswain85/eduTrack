
import { AiOutlineRise } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { updateStatus } from '../../features/Tasks/taskSlice';

function ManageTask() {
  const taskSelector = useSelector(state => state.tasks.tasks);
  const currentUser = useSelector(state => state.loggedUser.loggedUser);
  const currentUserTasks = taskSelector.filter(task => task.studentId == currentUser.studentId);
  const dispatch = useDispatch();
  function handleStatusChange(id, status) {

    try {
      dispatch(updateStatus({ id, status }));
      toast.success('Task status updated');
    } catch (error) {
      toast.error('Failed to update the status');
      console.log(error);
    }
  }
    

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

      <div className="rounded-2xl bg-white w-full md:min-h-[80vh] flex md:flex-row flex-col gap-4 p-4">
        <div className="md:w-[33%] w-full hideScrollBar overflow-auto md:min-h-full min-h-[30%] bg-red-200 flex flex-col gap-4 pt-0 p-2 items-center">
          <h1 className="text-center font-bold text-2xl sticky top-0 bg-red-700 text-white w-full">High Priority</h1>
          {highPriorityTasks.map((task) => (
            <div
              key={task.taskId}
              className="bg-white w-full p-4 h-full flex flex-col flex-wrap border-l-5 inset-shadow-sm/10 border-indigo-400 gap-2 rounded-2xl shadow hover:shadow-md justify-baseline items-start"
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
              <div>
                <p className="italic font-semibold">{task.taskDueDate}</p>
                <select
                  onChange={(e) =>
                    handleStatusChange(task.taskId, e.target.value)
                  }
                  value={task.taskStatus}
                  className={` w-full p-1 mt-2 rounded-2xl inset-shadow-sm/20 font-semibold ${task.taskStatus === "Pending" ? `bg-red-100` : task.taskStatus === "In Progress" ? `bg-amber-100` : `bg-green-100`}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="md:w-[33%] hideScrollBar w-full md:min-h-full min-h-[30%] overflow-auto bg-amber-200 flex flex-col gap-4 pt-0 p-2  items-center">
          <h1 className="text-center font-bold text-2xl sticky top-0 bg-amber-400 w-full">Medium Priority</h1>
          {mediumPriorityTasks.map((task) => (
            <div
              key={task.taskId}
              className="bg-white w-full p-4 h-full flex flex-col flex-wrap border-l-5 inset-shadow-sm/10 border-indigo-400 gap-2 rounded-2xl shadow hover:shadow-md justify-baseline items-start"
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
              <div>
                <p className="italic font-semibold">{task.taskDueDate}</p>
                <select
                  onChange={(e) =>
                    handleStatusChange(task.taskId, e.target.value)
                  }
                  value={task.taskStatus}
                  className={` w-full p-1 mt-2 rounded-2xl inset-shadow-sm/20 font-semibold  ${task.taskStatus === "Pending" ? `bg-red-100` : task.taskStatus === "In Progress" ? `bg-amber-100` : `bg-green-100`}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="md:w-[33%] hideScrollBar w-full md:min-h-full min-h-[30%] bg-green-200 flex flex-col gap-4 pt-0 p-2 items-center">
          <h1 className="text-center font-bold text-2xl sticky top-0 w-full bg-green-600 text-white">Low Priority</h1>
          {lowPriorityTasks.map((task) => (
            <div
              key={task.taskId}
              className="bg-white w-full p-4 h-full flex flex-col flex-wrap border-l-5 inset-shadow-sm/10 border-indigo-400 gap-2 rounded-2xl shadow hover:shadow-md justify-baseline items-start"
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
              <div>
                <p className="italic font-semibold">{task.taskDueDate}</p>
                <select
                  onChange={(e) =>
                    handleStatusChange(task.taskId, e.target.value)
                  }
                  value={task.taskStatus}
                  className={` w-full p-1 mt-2 rounded-2xl inset-shadow-sm/20 font-semibold ${task.taskStatus === "Pending" ? `bg-red-100` : task.taskStatus === "In Progress" ? `bg-amber-100` : `bg-green-100`}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageTask