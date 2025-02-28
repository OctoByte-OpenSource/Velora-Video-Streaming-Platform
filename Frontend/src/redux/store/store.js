import authSlice from "@/redux/slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import api from "../api/apiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
});

export default store;
