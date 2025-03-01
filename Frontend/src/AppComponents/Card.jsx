// /* eslint-disable react/prop-types */

import moment from "moment";
import Avatar from "./Utility/Avatar";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col  cursor-pointer rounded-2xl  text-sm"
      onClick={() => navigate(`/video/${_id}`)}
    >
      <div className="w-[350px] h-[200px] bg-black rounded-lg overflow-hidden">
        <img
          src={thumbnail}
          className="w-full h-full object-cover rounded-lg"
          alt="Thumbnail"
        />
      </div>
      <div className=" flex gap-4 p-2">
        <Avatar />
        <div className=" flex flex-col">
          <p className=" font-semibold text-black">{title}</p>
          <p className="font-semibold text-black">{channel_name}</p>
          <div className=" flex gap-3 text-sm font-bold">
            <p className=" ">{views} views</p>
            <p>{timeAgo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
