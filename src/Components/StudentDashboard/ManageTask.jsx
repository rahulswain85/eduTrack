import { useEffect } from 'react';
import { AiOutlineRise } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTaskStatus, updateTaskPriority } from '../../features/Tasks/taskApiSlice';
import { toast } from 'react-toastify';

function ManageTask() {
  const { tasks, loading } = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    }
  }, [dispatch, user]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No date';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const highPriorityTasks = tasks.filter((t) => t.taskPriority === 'High');
  const mediumPriorityTasks = tasks.filter((t) => t.taskPriority === 'Medium');
  const lowPriorityTasks = tasks.filter((t) => t.taskPriority === 'Low');

  const TaskCard = ({ task }) => (
    <div className="bg-white w-full p-4 flex flex-col gap-3 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 font-semibold text-sm">
          {task.taskPriority}
          <AiOutlineRise
            className={`size-5 ${
              task.taskPriority === 'High'
                ? 'text-red-500'
                : task.taskPriority === 'Medium'
                ? 'text-amber-500'
                : 'text-emerald-500'
            }`}
          />
        </span>
        <select
          value={task.taskPriority}
          onChange={(e) =>
            dispatch(updateTaskPriority({ id: task._id, taskPriority: e.target.value }))
              .unwrap()
              .then(() => toast.success('Priority updated'))
              .catch((err) => toast.error(err))
          }
          className={`text-xs px-2 py-1 rounded-lg font-medium ${
            task.taskPriority === 'High'
              ? 'bg-red-100 text-red-800'
              : task.taskPriority === 'Medium'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <p className="text-lg font-bold text-indigo-600">{task.taskTitle}</p>
      <p className="text-sm italic text-slate-600">{formatDate(task.taskDueDate)}</p>
      <select
        value={task.taskStatus}
        onChange={(e) =>
          dispatch(updateTaskStatus({ id: task._id, taskStatus: e.target.value }))
            .unwrap()
            .then(() => toast.success('Status updated'))
            .catch((err) => toast.error(err))
        }
        className={`w-full p-2 rounded-lg text-sm font-medium ${
          task.taskStatus === 'Pending'
            ? 'bg-amber-50 text-amber-800'
            : task.taskStatus === 'In Progress'
            ? 'bg-sky-50 text-sky-800'
            : 'bg-emerald-50 text-emerald-800'
        }`}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );

  const Column = ({ title, tasks: columnTasks, bgHeader }) => (
    <div className="flex flex-col gap-4 w-full min-w-[280px] max-w-[380px] rounded-2xl overflow-hidden bg-white/80 shadow-sm">
      <h2 className={`text-lg font-bold py-3 px-4 text-white ${bgHeader}`}>{title}</h2>
      <div className="flex flex-col gap-3 p-4 overflow-auto max-h-[60vh] hideScrollBar">
        {columnTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
        {columnTasks.length === 0 && (
          <p className="text-slate-500 text-sm text-center py-4">No tasks</p>
        )}
      </div>
    </div>
  );

  if (!user) return null;

  return (
    <div className="w-full p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Manage Tasks</h1>
      {loading ? (
        <p className="text-slate-500">Loading tasks...</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <Column
            title="High Priority"
            tasks={highPriorityTasks}
            bgHeader="bg-red-500"
          />
          <Column
            title="Medium Priority"
            tasks={mediumPriorityTasks}
            bgHeader="bg-amber-500"
          />
          <Column
            title="Low Priority"
            tasks={lowPriorityTasks}
            bgHeader="bg-emerald-500"
          />
        </div>
      )}
    </div>
  );
}

export default ManageTask;
