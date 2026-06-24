import { useEffect, useMemo, useState } from 'react';

function toDateInputValue(dateLike) {
  if (!dateLike) return '';
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function UpdateTaskModal({
  isOpen,
  task,
  onCancel,
  onSave,
  isSaving,
  error,
}) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setTitle(task?.taskTitle ?? '');
    setDueDate(toDateInputValue(task?.taskDueDate));
  }, [isOpen, task?._id]);

  const isValid = useMemo(() => {
    return title.trim().length > 0 && (dueDate === '' || !Number.isNaN(new Date(dueDate).getTime()));
  }, [title, dueDate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
        aria-label="Close update dialog"
      />

      <div className="relative w-[92vw] max-w-md rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Update Task</h2>
          <p className="text-sm text-slate-500">Edit title and due date.</p>
        </div>

        <div className="p-6 space-y-4">
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col gap-2">
            <label htmlFor="updateTaskTitle" className="text-sm font-medium text-slate-700">
              Task Title
            </label>
            <input
              id="updateTaskTitle"
              type="text"
              className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="updateDueDate" className="text-sm font-medium text-slate-700">
              Due Date
            </label>
            <input
              id="updateDueDate"
              type="date"
              className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={isSaving}
            />
            <p className="text-xs text-slate-500">Leave empty for no due date.</p>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() =>
              onSave({
                taskTitle: title.trim(),
                taskDueDate: dueDate,
              })
            }
            className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!isValid || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

