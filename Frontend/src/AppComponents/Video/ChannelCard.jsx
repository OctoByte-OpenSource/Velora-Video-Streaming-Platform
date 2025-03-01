import React from "react";
import Avatar from "../Utility/Avatar";
import { useNavigate } from "react-router-dom";

const ChannelCard = ({ channel }) => {
  console.log(channel);
  const navigate = useNavigate();
  const { username, subcribers, email, profileImage, _id } = channel;
  const subcribersLength = subcribers.length;
  let url =
    "https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg";

  if (typeof profileImage === "string") {
    url = profileImage;
  }

  return (
    <div className=" w-full min-h-44 bg-pink-700 rounded-lg p-3">
      <div className=" flex flex-col justify-center gap-3 items-center">
        <div
          className=" text-white flex flex-col justify-center items-center"
          onClick={() => navigate(`/user/profile/${_id}`)}
        >
          <Avatar src={url} size="150px" />
          <p className=" font-bold">{username}</p>
          <p className=" text-sm">{email}</p>
        </div>
        <p className=" text-xs  text-gray-300">
          {subcribersLength} Subscribers
        </p>

        <button className=" p-2 text-white bg-red-600 rounded-3xl">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default ChannelCard;

/*
->button work

->subscribe and unsubscribe option

onclick -> navigate to profile

*/
