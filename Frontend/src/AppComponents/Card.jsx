/* eslint-disable react/prop-types */

const Card = ({ thumbnail, description, channel_name }) => {
	return (
		<div className='flex flex-col items-start'>
			<div className='w-[380px] bg-black rounded-lg'>
				<img src={thumbnail} className='w-full h-auto rounded-lg' />

				{/* <img src={videoThumbnail.thumbnail} alt="Video Thumbnail" className="w-full h-auto rounded-lg shadow-md" />
            <p className="mt-2 text-center font-semibold">{videoThumbnail.channel_name}</p> */}
			</div>

			<p className='mt-2 font-semibold text-black'>{description}</p>
			<p className='mt-1 font-semibold text-black'>{channel_name}</p>
		</div>
	);
};

// const Card = ({children}) => {
//     console.log(children);
//     console.log("Hello")
// }

export default Card;
