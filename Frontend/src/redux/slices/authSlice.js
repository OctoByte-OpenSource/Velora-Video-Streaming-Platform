// import { registerUser } from "@/api/auth";
import { createSlice } from "@reduxjs/toolkit";
// import { error } from "console";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: (() => {
			try {
				return JSON.parse(localStorage.getItem("user")) || null;
			} catch (e) {
				console.error("Error parsing user data from localStorage:", e);
				return null;
			}
		})(),
		token: localStorage.getItem("token") || null,
		isAuthenticated: !!localStorage.getItem("token"),
	},
	reducers: {
		setLoginData(state, action) {
			if (action.payload.success) {
				console.log("Login successful");
				localStorage.setItem("user", JSON.stringify(action.payload.user));
				localStorage.setItem("token", action.payload.token);
			}
			return {
				...state,
				isAuthenticated: action.payload.success,
				user: action.payload.success ? action.payload.user : state.user,
				token: action.payload.success ? action.payload.token : state.token,
			};
		},
		logout(state) {
			localStorage.clear();
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setLoginData, logout } = authSlice.actions;

export default authSlice.reducer;
