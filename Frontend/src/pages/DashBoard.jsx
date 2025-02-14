import Card from "@/AppComponents/Card";
// import NavBar from "@/AppComponents/NavBar";
import { data } from "@/data/data";

const DashBoard = () => {
	return (
		<div>
			<div className='grid grid-cols-4 gap-10 pl-2 pr-10 pt-2 pb-2'>
				{data?.map((video) => (
					// console.log("Hello", video.thumbnail)
					<Card
						key={video.id}
						thumbnail={video.thumbnail}
						description={video.description}
						channel_name={video.channel_name}></Card>
				))}
			</div>
		</div>
	);
};

// function DashBoard() {
// 	return (
// 		<div className='grid grid-cols-4 gap-4'>
// 			{data?.map((video) => (
// 				<div key={video.id} className='border p-4'>
// 					<img src={video.thumbnail} alt={video.title} />
// 					<h2 className='font-bold'>{video.title}</h2>
// 					<p>{video.description}</p>
// 				</div>
// 			))}
// 		</div>
// 	);
// }

export default DashBoard;
