
import { useDispatch, useSelector } from "react-redux";
// Combine your reducers if you have more slices
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlice } from "./slice/user/userSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Combine your reducers if you have more slices
const rootReducer = combineReducers({
  user: userSlice.reducer,
});

// Config for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
  },
});

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});

export const persistor = persistStore(store);

// Custom hooks for dispatch and selector
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

