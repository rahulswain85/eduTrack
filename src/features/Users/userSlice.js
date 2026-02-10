import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    users: []
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        registerStudent: (state, action) => {
            state.users.push(
                {
                    studentId: nanoid,
                    ...action.payload
                }
            );
        }
    }
})

export const { registerStudent } = userSlice.actions;
export default userSlice.reducer;