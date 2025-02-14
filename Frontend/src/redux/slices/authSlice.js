// import { registerUser } from "@/api/auth";
import { createSlice } from "@reduxjs/toolkit";
// import { error } from "console";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('user') || null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        error: null
    },
    reducers:{
        setSignUpData(state, action){
            state.user = action.payload.user
        },
        setLoginData(state, action){
            state.token = action.payload.token
            localStorage.setItem('user', action.payload.user);
            localStorage.setItem('token', action.payload.token);
            action.payload.success ?  state.isAuthenticated = true : state.isAuthenticated = false;
           
        },
        authFailed(state, action){
            state.error = action.payload
        }
    }
})

export const {setSignUpData, setLoginData, authFailed} =  authSlice.actions;

export default authSlice.reducer