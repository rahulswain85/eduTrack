import { useEffect } from 'react';
import { AiOutlineRise } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTaskStatus, updateTaskPriority, deleteTask } from '../../features/Tasks/taskApiSlice';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';

function AllTasks() {
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

  const getPriorityColor = (p) => {
    if (p === 'High') return 'bg-red-100 text-red-800';
    if (p === 'Medium') return 'bg-amber-100 text-amber-800';
    return 'bg-emerald-100 text-emerald-800';
  };

  const getStatusColor = (s) => {
    if (s === 'Pending') return 'bg-amber-50 text-amber-800';
    if (s === 'In Progress') return 'bg-sky-50 text-sky-800';
    return 'bg-emerald-50 text-emerald-800';
  };

  async function handleDelete(id) {
    try {
      await dispatch(deleteTask(id)).unwrap();
      toast.success('Task deleted');
    } catch (error) {
      toast.error(error || 'Failed to delete task');
    }
  }

  if (!user) return null;

  return (
    <div className="w-full p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">All Tasks</h1>
      {loading ? (
        <p className="text-slate-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
          <p className="text-slate-500 text-lg">No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Title</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Priority</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Due Date</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition"
                >
                  <td className="py-4 px-6">
                    <span className="font-medium text-indigo-600">{task.taskTitle}</span>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={task.taskPriority}
                      onChange={(e) =>
                        dispatch(updateTaskPriority({ id: task._id, taskPriority: e.target.value }))
                          .unwrap()
                          .then(() => toast.success('Priority updated'))
                          .catch((err) => toast.error(err))
                      }
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${getPriorityColor(task.taskPriority)}`}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={task.taskStatus}
                      onChange={(e) =>
                        dispatch(updateTaskStatus({ id: task._id, taskStatus: e.target.value }))
                          .unwrap()
                          .then(() => toast.success('Status updated'))
                          .catch((err) => toast.error(err))
                      }
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(task.taskStatus)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{formatDate(task.taskDueDate)}</td>
                  <td className="py-4 px-6">
                    <button
                      type="button"
                      onClick={() => handleDelete(task._id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                      title="Delete task"
                    >
                      <MdDelete className="size-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllTasks;
