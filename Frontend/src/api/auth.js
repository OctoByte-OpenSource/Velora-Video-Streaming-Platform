import axiosInstance from "./axiosInstance"
import { setSignUpData, setLoginData, authFailed } from "@/redux/slices/authSlice";

export const registerUser = (userData) => async (dispatch) => {
    try{
        const response = await axiosInstance.post('/auth/register', userData);
        dispatch(setSignUpData(response.data))
    }catch(e){
        dispatch(authFailed(e))
    }

}

export const loginUser = (userData) => async(dispatch) => {
    try{
        const response = await axiosInstance.post('/auth/login', userData);
        dispatch(setLoginData(response.data))
    }catch(e){
        dispatch(authFailed(e));
    }
}
