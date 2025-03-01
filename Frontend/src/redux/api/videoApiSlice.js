import api from "./apiSlice";

const videoSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		uploadVideo: builder.mutation({
			query: (data) => ({
				url: "videos/upload",
				method: "POST",
				body: data,
				formData: true,
			}),
		}),
		getSingleVideo: builder.query({
			query: (id) => ({
				url: `videos/getSingleVideo/${id}`,
			}),
		}),
		getAllVideos: builder.query({
			query: ({ page = 1, limit = 10 }) => ({
				url: `videos/getAllVideos?page=${page}&limit=${limit}`,
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
	useGetSingleVideoQuery,
	useLazyGetSingleVideoQuery,
	useGetAllVideosQuery,
	useDeleteVideoMutation,
	useLikeVideoMutation,
	useViewCountMutation,
} = videoSlice;
