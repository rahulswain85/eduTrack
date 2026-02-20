import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    tasks: []
}


const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers:
  {
    addNewTask: (state, action) => {
      state.tasks.push({
        taskId: nanoid(),
        studentId: action.payload.studentId,
        taskTitle: action.payload.taskTitle,
        taskCreatedOn: Date.now(),
        taskStatus: "Pending",
        taskDueDate: action.payload.taskDueDate,
        taskPriority: action.payload.taskPriority,
      });
    },
    updateStatus: (state, action) => {
      console.log(action.payload.status, action.payload.id);
      
      const task = state.tasks.find(task => task.taskId == action.payload.id);

      if (task) {
        task.taskStatus = action.payload.status;
      }
    }
  }
});

export const { addNewTask, updateStatus } = taskSlice.actions;
export default taskSlice.reducer