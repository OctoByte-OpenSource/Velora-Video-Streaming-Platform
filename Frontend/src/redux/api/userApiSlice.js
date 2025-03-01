import api from "./apiSlice";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (id) => ({
        url: `user/info/${id}`,
      }),
    }),
    getAllUsersInfo: builder.query({
      query: (value) => ({
        url: `user/getAllUsers?name=${value}`,
      }),
    }),
    subscribeChannel: builder.mutation({
      query: (id) => ({
        url: `user/subscribeChannel/${id}`,
        method: "POST",
      }),
    }),
    unsubscribeChannel: builder.mutation({
      query: (id) => ({
        url: `user/unsubscribeChannel/${id}`,
        method: "POST",
      }),
    }),
    // query for:
    //-update profile
    // - update bio
  }),
});

export default userSlice;

export const {
  useLazyGetAllUsersInfoQuery,
  useGetAllUsersInfoQuery,
  useGetUserInfoQuery,
  useSubscribeChannelMutation,
  useUnsubscribeChannelMutation,
} = userSlice;
