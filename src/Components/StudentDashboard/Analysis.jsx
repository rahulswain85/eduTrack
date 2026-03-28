import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../features/Tasks/taskApiSlice';

export function Analysis() {
  const { tasks, loading } = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    }
  }, [dispatch, user]);

  if (!user) return null;

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.taskStatus === 'Pending').length;
  const inProgressTasks = tasks.filter((t) => t.taskStatus === 'In Progress').length;
  const completedTasks = tasks.filter((t) => t.taskStatus === 'Completed').length;
  const highPriorityTasks = tasks.filter((t) => t.taskPriority === 'High').length;
  const mediumPriorityTasks = tasks.filter((t) => t.taskPriority === 'Medium').length;
  const lowPriorityTasks = tasks.filter((t) => t.taskPriority === 'Low').length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const pendingRate = totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0;
  const inProgressRate = totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;

  return (
    <div className="w-full p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Task Analysis</h1>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Status Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-700 font-medium">Pending</span>
                  <span>{pendingTasks} ({pendingRate}%)</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${pendingRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-sky-700 font-medium">In Progress</span>
                  <span>{inProgressTasks} ({inProgressRate}%)</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-400 rounded-full transition-all"
                    style={{ width: `${inProgressRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-emerald-700 font-medium">Completed</span>
                  <span>{completedTasks} ({completionRate}%)</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Priority Distribution</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-red-50">
                <span className="font-medium text-red-800">High Priority</span>
                <span className="text-2xl font-bold text-red-600">{highPriorityTasks}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50">
                <span className="font-medium text-amber-800">Medium Priority</span>
                <span className="text-2xl font-bold text-amber-600">{mediumPriorityTasks}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50">
                <span className="font-medium text-emerald-800">Low Priority</span>
                <span className="text-2xl font-bold text-emerald-600">{lowPriorityTasks}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-6 shadow-md text-white">
            <h2 className="text-lg font-bold mb-2">Summary</h2>
            <p className="text-indigo-100">
              You have <strong>{totalTasks}</strong> total tasks. Your completion rate is{' '}
              <strong>{completionRate}%</strong>.
              {totalTasks === 0 && ' Start by creating your first task!'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
