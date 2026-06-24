import { useEffect, useState } from 'react';
import { AiOutlineRise } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTaskStatus, updateTaskPriority, deleteTask, updateTaskDetails } from '../../features/Tasks/taskApiSlice';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import UpdateTaskModal from './UpdateTaskModal';

function AllTasks() {
  const { tasks, loading } = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

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

  function openUpdate(task) {
    setSelectedTask(task);
    setUpdateError(null);
    setIsUpdateOpen(true);
  }

  function closeUpdate() {
    if (isUpdating) return;
    setIsUpdateOpen(false);
    setSelectedTask(null);
    setUpdateError(null);
  }

  async function handleSaveUpdate({ taskTitle, taskDueDate }) {
    if (!selectedTask?._id) return;
    setIsUpdating(true);
    setUpdateError(null);
    try {
      await dispatch(
        updateTaskDetails({
          id: selectedTask._id,
          taskTitle,
          taskDueDate: taskDueDate || null,
        })
      ).unwrap();
      toast.success('Task updated');
      setIsUpdateOpen(false);
      setSelectedTask(null);
    } catch (error) {
      setUpdateError(error || 'Failed to update task');
    } finally {
      setIsUpdating(false);
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
          <p className="text-slate-500 text-lg">
            No tasks yet. Create your first task!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Title */}
              <div>
                <p className="font-medium text-indigo-600">{task.taskTitle}</p>
                <p className="text-sm text-slate-500">
                  {formatDate(task.taskDueDate)}
                </p>
              </div>

              {/* Priority */}
              <select
                value={task.taskPriority}
                onChange={(e) =>
                  dispatch(
                    updateTaskPriority({
                      id: task._id,
                      taskPriority: e.target.value,
                    }),
                  )
                }
                className={`px-3 py-1 rounded-lg text-sm font-medium ${getPriorityColor(task.taskPriority)}`}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              {/* Status */}
              <select
                value={task.taskStatus}
                onChange={(e) =>
                  dispatch(
                    updateTaskStatus({
                      id: task._id,
                      taskStatus: e.target.value,
                    }),
                  )
                }
                className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(task.taskStatus)}`}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <div>
                {/* Edit */}
                <button
                  onClick={() => openUpdate(task)}
                  className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 self-start sm:self-auto"
                  aria-label="Update task"
                >
                  <FaEdit />
                </button>
                {/* Delete */}
                <button
                  onClick={() => handleDelete(task._id)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 self-start sm:self-auto"
                >
                  <MdDelete  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <UpdateTaskModal
        isOpen={isUpdateOpen}
        task={selectedTask}
        onCancel={closeUpdate}
        onSave={handleSaveUpdate}
        isSaving={isUpdating}
        error={updateError}
      />
    </div>
  );
}

export default AllTasks;
