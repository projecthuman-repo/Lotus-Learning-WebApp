// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...action.payload };
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, updateUser, clearUser } = userSlice.actions;

