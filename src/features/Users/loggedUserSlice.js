import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedUser: null
}

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    studentLogin: (state, action) => {
      state.loggedUser = action.payload;
    },
  },
});

export const { studentLogin } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;