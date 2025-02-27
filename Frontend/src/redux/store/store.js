import authSlice from "@/redux/slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import api from "../../redux/api/apiSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export default store;
