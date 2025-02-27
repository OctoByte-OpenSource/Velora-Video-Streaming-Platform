import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/AppComponents/Layout/AppLayout";
import {
	useUploadVideoMutation,
	useLazyGetSingleVideoQuery,
} from "../redux/api/videoApiSlice";

const UploadVideo = () => {
	const { videoId } = useParams();
	const navigate = useNavigate();

	const [videoFile, setVideoFile] = useState(null);
	const [thumbnailFile, setThumbnailFile] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [videoUrl, setVideoUrl] = useState("");
	const [thumbnailUrl, setThumbnailUrl] = useState("");

	const [getSingleVideo, { data: videoData, isFetching }] =
		useLazyGetSingleVideoQuery();
	const [uploadVideo, { isLoading }] = useUploadVideoMutation();

	useEffect(() => {
		if (videoId) {
			getSingleVideo(videoId)
				.unwrap()
				.then((data) => {
					console.log("Fetched video:", data);
					setTitle(data.title || "");
					setDescription(data.description || "");
				})
				.catch((err) => console.error("Error fetching video:", err));
		}
	}, [videoId, getSingleVideo]);

	useEffect(() => {
		if (videoData && videoData.data) {
			console.log("Fetched Video Data:", videoData.data);
			console.log("Video URL:", videoData.data.video_url);
			console.log("Thumbnail URL:", videoData.data.thumbnail);

			setTitle(videoData.data.title || "");
			setDescription(videoData.data.description || "");
			setVideoUrl(videoData.data.video_url || "");
			setThumbnailUrl(videoData.data.thumbnail || "");
		}
	}, [videoData]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		if (videoId) formData.append("videoId", videoId);
		formData.append("title", title);
		formData.append("description", description);
		if (videoFile) formData.append("video", videoFile);
		if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

		try {
			await uploadVideo(formData).unwrap();
			alert(
				videoId ? "Video updated successfully!" : "Video uploaded successfully!"
			);
			navigate("/");
		} catch (error) {
			console.error("Upload failed:", error);
		}
	};

	return (
		<div className='flex gap-6 p-6'>
			<div className='w-1/2'>
				<div className='bg-gray-200 w-full h-96 flex items-center justify-center'>
					{videoFile ? (
						<video
							src={URL.createObjectURL(videoFile)}
							controls
							className='w-full h-full object-cover'
						/>
					) : videoUrl ? (
						<video
							src={videoUrl}
							controls
							className='w-full h-full object-cover'
						/>
					) : (
						<span className='text-gray-500'>Video Preview</span>
					)}
				</div>
				<div className='bg-gray-200 w-74 h-52 flex items-center justify-center mt-4'>
					{thumbnailFile ? (
						<img
							src={URL.createObjectURL(thumbnailFile)}
							alt='Thumbnail'
							className='w-full h-full object-contain'
						/>
					) : thumbnailUrl ? (
						<img
							src={thumbnailUrl}
							alt='Thumbnail'
							className='w-full h-full object-contain'
						/>
					) : (
						<span className='text-gray-500'>Video Thumbnail</span>
					)}
				</div>
			</div>

			<div className='w-1/2 space-y-4'>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block font-medium'>Upload Video</label>
						<input
							type='file'
							accept='video/*'
							onChange={(e) => {
								setVideoFile(e.target.files[0]);
								setVideoUrl("");
							}}
							className='border p-2 w-full'
						/>
					</div>
					<div>
						<label className='block font-medium'>Thumbnail</label>
						<input
							type='file'
							accept='image/*'
							onChange={(e) => {
								setThumbnailFile(e.target.files[0]);
								setThumbnailUrl("");
							}}
							className='border p-2 w-full'
						/>
					</div>
					<div>
						<label className='block font-medium'>Video Title</label>
						<input
							type='text'
							placeholder='Enter video title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='border p-2 w-full'
						/>
					</div>
					<div>
						<label className='block font-medium'>Video Description</label>
						<textarea
							placeholder='Enter video description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={10}
							className='border p-2 w-full'></textarea>
					</div>
					<button
						type='submit'
						className='bg-blue-600 text-white px-4 py-2 w-full'>
						{isLoading
							? "Processing..."
							: videoId
							? "Update Video"
							: "Upload Video"}
					</button>
				</form>
				{isFetching && (
					<p className='text-gray-500'>Fetching video details...</p>
				)}
			</div>
		</div>
	);
};

export default AppLayout()(UploadVideo);
