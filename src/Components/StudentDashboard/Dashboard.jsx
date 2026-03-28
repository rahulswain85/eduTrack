import { useEffect } from 'react';
import { AiOutlineRise } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTaskStatus } from '../../features/Tasks/taskApiSlice';
import { toast } from 'react-toastify';

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const { tasks, loading } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    }
  }, [dispatch, user]);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.taskStatus === 'Pending').length;
  const inProgressTasks = tasks.filter((t) => t.taskStatus === 'In Progress').length;
  const completedTasks = tasks.filter((t) => t.taskStatus === 'Completed').length;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No date';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  async function handleStatusChange(id, status) {
    try {
      await dispatch(updateTaskStatus({ id, taskStatus: status })).unwrap();
      toast.success('Task status updated');
    } catch (error) {
      toast.error(error || 'Failed to update status');
    }
  }

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard</h1>
        <div className="flex flex-col items-center md:items-end">
          <p className="text-sm font-medium text-slate-500">Welcome back</p>
          <p className="text-lg font-semibold text-indigo-600">{user.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col bg-indigo-500 text-white rounded-2xl p-6 shadow-md">
          <p className="text-4xl font-bold">{totalTasks}</p>
          <p className="text-indigo-100 font-medium">Total Tasks</p>
        </div>
        <div className="flex flex-col bg-amber-400 text-amber-900 rounded-2xl p-6 shadow-md">
          <p className="text-4xl font-bold">{pendingTasks}</p>
          <p className="text-amber-800 font-medium">Pending</p>
        </div>
        <div className="flex flex-col bg-sky-400 text-sky-900 rounded-2xl p-6 shadow-md">
          <p className="text-4xl font-bold">{inProgressTasks}</p>
          <p className="text-sky-800 font-medium">In Progress</p>
        </div>
        <div className="flex flex-col bg-emerald-500 text-white rounded-2xl p-6 shadow-md">
          <p className="text-4xl font-bold">{completedTasks}</p>
          <p className="text-emerald-100 font-medium">Completed</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Tasks</h2>
        {loading ? (
          <p className="text-slate-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-slate-500 py-8 text-center">No tasks yet. Create your first task!</p>
        ) : (
          <div className="flex flex-wrap gap-4 overflow-x-auto hideScrollBar">
            {tasks.slice(0, 8).map((task) => (
              <div
                key={task._id}
                className="min-w-[260px] max-w-[300px] p-4 flex flex-col gap-3 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 font-semibold text-sm">
                    {task.taskPriority}
                    <AiOutlineRise
                      className={`size-5 rounded-full p-0.5 ${
                        task.taskPriority === 'High'
                          ? 'text-red-500'
                          : task.taskPriority === 'Medium'
                          ? 'text-amber-500'
                          : 'text-emerald-500'
                      }`}
                    />
                  </span>
                </div>
                <p className="text-lg font-bold text-indigo-600">{task.taskTitle}</p>
                <p className="text-sm italic text-slate-600">{formatDate(task.taskDueDate)}</p>
                <select
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  value={task.taskStatus}
                  className={`w-full p-2 rounded-lg font-medium text-sm ${
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
