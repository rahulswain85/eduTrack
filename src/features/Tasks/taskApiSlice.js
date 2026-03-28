import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/tasks');
      return data.tasks;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch tasks'
      );
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/tasks', payload);
      return data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create task'
      );
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateStatus',
  async ({ id, taskStatus }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/tasks/${id}/status`, { taskStatus });
      return data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update status'
      );
    }
  }
);

export const updateTaskPriority = createAsyncThunk(
  'tasks/updatePriority',
  async ({ id, taskPriority }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/tasks/${id}/priority`, { taskPriority });
      return data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update priority'
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete task'
      );
    }
  }
);

const taskApiSlice = createSlice({
  name: 'taskApi',
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.tasks[idx] = action.payload;
      })
      .addCase(updateTaskPriority.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.tasks[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export const { clearTasks } = taskApiSlice.actions;
export default taskApiSlice.reducer;
