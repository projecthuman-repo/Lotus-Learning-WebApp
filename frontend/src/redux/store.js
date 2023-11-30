import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slice/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
