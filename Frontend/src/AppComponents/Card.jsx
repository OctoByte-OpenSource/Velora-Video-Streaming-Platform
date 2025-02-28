// /* eslint-disable react/prop-types */

// const Card = ({ thumbnail, description, channel_name }) => {
// 	return (
// 		<div className='flex flex-col items-start'>
// 			<div className='w-[380px] bg-black rounded-lg'>
// 				<img src={thumbnail} className='w-full h-auto rounded-lg' />
// 			</div>

// 			<p className='mt-2 font-semibold text-black'>{description}</p>
// 			<p className='mt-1 font-semibold text-black'>{channel_name}</p>
// 		</div>
// 	);
// };

// export default Card;

/* eslint-disable react/prop-types */

const Card = ({ thumbnail, description, channel_name }) => {
	return (
		<div className='flex flex-col items-start'>
			<div className='w-[380px] h-[200px] bg-black rounded-lg overflow-hidden'>
				<img
					src={thumbnail}
					className='w-full h-full object-cover rounded-lg'
					alt='Thumbnail'
				/>
			</div>

			<p className='mt-2 font-semibold text-black'>{description}</p>
			<p className='mt-1 font-semibold text-black'>{channel_name}</p>
		</div>
	);
};

export default Card;
