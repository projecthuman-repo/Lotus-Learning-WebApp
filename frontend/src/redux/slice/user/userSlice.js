import { createSlice } from "@reduxjs/toolkit";

const initialState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...action.payload };
    },
    clearUser: (state) => {
      console.log(state);
      return null;
    },
  }
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;