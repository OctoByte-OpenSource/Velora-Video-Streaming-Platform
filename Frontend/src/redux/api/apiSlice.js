import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      // const  token  = getState().auth.token;
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E4OTNmMjU5YzVjZmU1ODQ5ZTEzNTEiLCJpYXQiOjE3MzkxMDEzNDB9.sHjXIJnn50j4E10vD27o0Px_K6PUFfEMzZ5MBCkNerk";

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});

export default api;
