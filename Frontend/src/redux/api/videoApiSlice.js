import api from "./apiSlice";

const videoSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadVideo: builder.mutation({
      query: (data) => ({
        url: "videos/upload",
        body: data,
        method: "POST",
      }),
    }),
    getAllVideos: builder.query({
      query: () => ({
        url: "videos/getAllVideos",
      }),
    }),
    getVideo: builder.query({
      query: (id) => ({
        url: `videos/getSingleVideo/${id}`,
      }),
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `videos/deleteVideo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Video"],
    }),
    searchVideo: builder.query({
      query: (value) => ({
        url: `videos/search?title=${value}`,
      }),
      keepUnusedDataFor: 0,
    }),
    viewCount: builder.mutation({
      query: (id) => ({
        url: `videos/${id}/views`,
        method: "PATCH",
      }),
    }),
    likeVideo: builder.mutation({
      query: (id) => ({
        url: `videos/${id}/like`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useUploadVideoMutation,
  useLazySearchVideoQuery,
  useGetAllVideosQuery,
  useDeleteVideoMutation,
  useLikeVideoMutation,
  useViewCountMutation,
  useGetVideoQuery,
} = videoSlice;
