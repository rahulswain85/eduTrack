import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from '../../features/Tasks/taskSlice';
import { toast } from 'react-toastify';

function CreateTask() {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("dis");
  const dispatch = useDispatch();
  const studentSelector = useSelector((state) => state.loggedUser.loggedUser);

  

  function handleCreateNewTask(event) {
    event.preventDefault();

    const newTask = {
      studentId: studentSelector.studentId,
      taskTitle: title,
      taskDueDate: date,
      taskPriority: priority
    };

    try {
      dispatch(addNewTask(newTask));
      toast.success("New Task Created!");
      setTitle("");
      setDate("");
      setPriority("");
    } catch (error) {
      console.log(error);
      
      toast.error("Failed to create a task!")
    }
  }


  return (
    <div className="w-full bg-white flex flex-col justify-center items-center p-8">
      <div className="w-full h-full shadow flex flex-col gap-4 justify-center items-center p-4 rounded-2xl">
        <h1 className="text-3xl font-bold bg-indigo-400 w-full rounded-2xl text-center text-white">
          Create New Task
        </h1>
        <form className="w-full flex flex-col gap-4 justify-center items-center bg-indigo-50 rounded-2xl p-4" onSubmit={(e)=>handleCreateNewTask(e)}>
          <input
            type="text"
            placeholder="Task Title"
            className="w-[70%] px-3 py-2 bg-white rounded-2xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-col justify-between items-start w-[70%]">
            <label htmlFor="DueDate" className="text-sm ml-2">
              Due Date
            </label>
            <input
              id="DueDate"
              type="date"
              className="w-full px-3 py-2 bg-white rounded-2xl"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <select
            className="w-[70%] px-3 py-2 bg-white rounded-2xl"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="dis" disabled>
              Select Task Priority
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button className="w-[70%] rounded-2xl bg-indigo-400 hover:bg-indigo-600 text-lg text-white font-bold transition duration-150 px-3 py-1">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask