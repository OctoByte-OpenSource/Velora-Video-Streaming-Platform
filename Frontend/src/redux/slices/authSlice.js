// import { registerUser } from "@/api/auth";
import { createSlice } from "@reduxjs/toolkit";
// import { error } from "console";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('user') || null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
    },
    reducers:{
        setLoginData(state, action){
            if (action.payload.success) {
                console.log("Bhai succcess hogaya")
                localStorage.setItem('user', action.payload.user);
                localStorage.setItem('token', action.payload.token);
                console.log("User localstorgae",localStorage.getItem('user'))
            }
            return {
                ...state,
                isAuthenticated: action.payload.success,
                user: action.payload.success ? action.payload.user : state.user,
                token: action.payload.success ? action.payload.token : state.token
            }
           
        },
        logout(state){
            localStorage.clear();
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    }
})

export const {setLoginData, logout} =  authSlice.actions;

export default authSlice.reducer