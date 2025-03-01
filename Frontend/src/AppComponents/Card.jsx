// /* eslint-disable react/prop-types */

import moment from "moment";
import { useState } from "react";
import Avatar from "./Utility/Avatar";
import { useNavigate } from "react-router-dom";

const Card = ({
	thumbnail,
	description,
	title,
	channel_name = "unknown",
	views,
	likes,
	time,
	_id,
}) => {
	const timeAgo = moment(time).fromNow();
	const [loaded, setLoaded] = useState(false);
	const navigate = useNavigate();

	return (
		<div
			className='flex flex-col cursor-pointer rounded-xl bg-white overflow-hidden 
      transition-transform duration-300 hover:shadow-lg'
			onClick={() => navigate(`/video/${_id}`)}>
			<div className='w-full h-56 bg-gray-200 overflow-hidden flex items-center justify-center'>
				<img
					src={thumbnail}
					loading='lazy'
					className={`w-full h-full object-cover transition-opacity duration-300 ${
						loaded ? "opacity-100" : "opacity-0 text-"
					}`}
					alt='Thumbnail'
					onLoad={() => setLoaded(true)} // Show image when loaded
				/>
			</div>

			{/* <div className='w-full h-56 bg-gray-200 overflow-hidden'>
				<img
					src={thumbnail}
					className='w-full h-full object-cover'
					alt='Thumbnail'
				/>
			</div> */}

			<div className='flex gap-3 p-3'>
				<Avatar />
				<div className='flex flex-col flex-1'>
					<p className='font-semibold text-gray-900 text-sm truncate'>
						{title}
					</p>
					<p className='text-gray-600 text-xs'>{channel_name}</p>
					<div className='flex gap-3 text-xs text-gray-500 font-medium'>
						<p>{views} views</p>
						<p>• {timeAgo}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
