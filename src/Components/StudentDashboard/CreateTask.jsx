import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../features/Tasks/taskApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  async function handleCreateNewTask(event) {
    event.preventDefault();
    if (!title.trim()) {
      toast.error('Task title is required');
      return;
    }
    if (!priority) {
      toast.error('Please select a priority');
      return;
    }

    try {
      await dispatch(
        createTask({
          taskTitle: title,
          taskDueDate: date || undefined,
          taskPriority: priority,
        })
      ).unwrap();
      toast.success('New task created!');
      setTitle('');
      setDate('');
      setPriority('');
      navigate('/manage');
    } catch (error) {
      toast.error(error || 'Failed to create task');
    }
  }

  if (!user) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-5 px-6">
          Create New Task
        </h1>
        <form
          className="flex flex-col gap-5 p-6 bg-slate-50/50"
          onSubmit={handleCreateNewTask}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="taskTitle" className="text-sm font-medium text-slate-700">
              Task Title
            </label>
            <input
              id="taskTitle"
              type="text"
              placeholder="Enter task title"
              className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="dueDate" className="text-sm font-medium text-slate-700">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="priority" className="text-sm font-medium text-slate-700">
              Priority
            </label>
            <select
              id="priority"
              className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition duration-200 active:scale-[0.98] shadow-md hover:shadow-lg"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
