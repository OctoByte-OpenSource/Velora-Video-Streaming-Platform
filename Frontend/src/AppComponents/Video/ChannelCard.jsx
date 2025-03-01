import React from "react";
import Avatar from "../Utility/Avatar";
import { useNavigate } from "react-router-dom";
import { SubscribeToTheChannelBtn } from "../Utility/SubscribeBtn";

const ChannelCard = ({ channel, refetch }) => {
  const navigate = useNavigate();
  const { username, subcribers, email, profileImage, _id } = channel;
  const subcribersLength = subcribers.length;
  let url =
    "https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg";

  if (typeof profileImage === "string") {
    url = profileImage;
  }

  return (
    <div className=" w-full min-h-44  rounded-lg p-3 shadow-lg">
      <div className=" flex flex-col justify-center gap-3 items-center">
        <div
          className=" black flex sm:flex-col gap-2  justify-center items-center"
          onClick={() => navigate(`/user/profile/${_id}`)}
        >
          <Avatar src={url} size="100px" />
          <div className=" flex flex-col justify-center items-center  ">
            <p className=" font-bold">{username}</p>
            <p className=" text-xs  text-gray-700">
              {subcribersLength} Subscribers
            </p>
          </div>
        </div>
        <SubscribeToTheChannelBtn
          subscribers={subcribers}
          id={_id}
          refetch={refetch}
          textSize="text-base"
        />
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
