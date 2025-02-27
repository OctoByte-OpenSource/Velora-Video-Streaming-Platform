import api from "./apiSlice";

export const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
              url: 'signup',
              method: 'POST',
              body: userData
            })
          }),
          loginUser: builder.mutation({
            query: (userData) => ({
              url: 'signin',
              method: 'POST',
              body: userData
            })
          })
    })
})

export const {useRegisterUserMutation, useLoginUserMutation} = authSlice;