import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	useGetAllVideosQuery,
	useDeleteVideoMutation,
} from "@/redux/api/videoApiSlice";
import { AppLayout } from "@/AppComponents/Layout/AppLayout";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";

const UploadedVideos = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { videos, loading } = useSelector((state) => state.videos);

	useEffect(() => {
		dispatch(useGetAllVideosQuery);
	}, [dispatch]);

	const handleEdit = (id) => {
		navigate(`/uploadVideo/${id}`);
	};

	const handleDelete = async () => {
		dispatch(useDeleteVideoMutation);
	};

	if (loading) return <p className='text-center text-gray-300'>Loading...</p>;

	return (
		<div className='max-w-3xl mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg'>
			<h2 className='text-xl font-bold mb-4'>All Uploaded Videos</h2>
			{videos.length === 0 ? (
				<p className='text-gray-400'>No videos uploaded yet.</p>
			) : (
				videos.map((video) => (
					<div
						key={video.id}
						className='flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-2 shadow-sm'>
						<img
							src={video.thumbnail}
							alt='Thumbnail'
							className='w-16 h-10 rounded-lg object-cover'
						/>
						<div className='flex-1 px-4'>
							<h3 className='text-lg font-semibold'>{video.title}</h3>
							<p className='text-gray-400 text-sm'>
								{video.views} views • {video.likes} likes
							</p>
						</div>
						<div className='flex gap-3'>
							<Pencil
								className='w-5 h-5 text-blue-400 cursor-pointer hover:text-blue-500'
								onClick={() => handleEdit(video.id)}
							/>
							<Trash
								className='w-5 h-5 text-red-400 cursor-pointer hover:text-red-500'
								onClick={() => handleDelete(video.id)}
							/>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default AppLayout()(UploadedVideos);
