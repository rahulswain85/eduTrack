import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    tasks: []
}


const taskSlice = createSlice(
    {
        name: "tasks",
        initialState,
        addNewTask: (state, action) => {
            state.tasks.push(
                {
                    taskId: nanoid(),
                    studentId: action.payload.studentId,
                    taskTitle: action.payload.taskTitle,
                    taskCreatedOn: action.payload.taskCreatedOn,
                    taskStatus: "Pending",
                    taskDueDate: action.payload.taskDueDate,
                    taskPriority: action.payload.taskPriority
                }
            )
        }
    }
)

export const { addNewTask } = taskSlice.actions;
export default taskSlice.reducer