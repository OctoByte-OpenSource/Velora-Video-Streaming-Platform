import React from "react";
import Avatar from "../Utility/Avatar";

const WatchPartyVideoDetails = ({ members, peopleCount }) => {
  return (
    <div className=" p-1">
      <div>
        <p className=" font-semibold">This should be title</p>
      </div>
      <div className=" flex justify-between">
        {" "}
        <p>Members</p>
        <p>Live: {peopleCount}</p>
      </div>
      <div className="flex">
        {members.map((member, i) => (
          <Avatar
            key={i}
            size="55px"
            src="https://png.pngtree.com/png-vector/20230831/ourlarge/pngtree-man-avatar-image-for-profile-png-image_9197911.png"
          >
            {member.username}
          </Avatar>
        ))}
      </div>
    </div>
  );
};

export default WatchPartyVideoDetails;
