import { useState, useEffect } from "react";
import Card from "@/AppComponents/Card";
import { useGetAllVideosQuery } from "@/redux/api/videoApiSlice";

const DashBoard = () => {
	const [videos, setVideos] = useState([]);
	const { data, error, isLoading } = useGetAllVideosQuery({
		page: 1,
		limit: 20,
	});

	useEffect(() => {
		if (data?.data) {
			setVideos(data.data); // Storing the array inside state
		}
	}, [data]);

	if (isLoading) return <p>Loading videos...</p>;
	if (error) return <p>Error fetching videos: {error.message}</p>;

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
			{videos.map((video) => (
				<Card
					key={video._id} // Use _id instead of id if needed
					thumbnail={video.thumbnail}
					description={video.description}
					channel_name={video.channel_name}
				/>
			))}
		</div>
	);
};

export default DashBoard;
