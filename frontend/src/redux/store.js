import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

