import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { useSelector } from "react-redux";

const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api/v1/",
		prepareHeaders: (headers, { getState }) => {
			const token =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E4OTNmMjU5YzVjZmU1ODQ5ZTEzNTEiLCJpYXQiOjE3NDAyMjUzOTZ9.ckDKqaf7-5WFiCyfaotsbz0BMv693E6olZFGQGeufUA";
			// getState().auth.token;
			console.log("Auth Token:", token);

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			} else {
				console.warn("No token found!");
			}
		},
	}),
	tagTypes: [],
	endpoints: () => ({}),
});

export default api;
