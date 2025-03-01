import authSlice from "@/redux/slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import api from "../api/apiSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
