import React from "react";
import Avatar from "../Utility/Avatar";

const WatchPartyVideoDetails = ({ members, peopleCount }) => {
  return (
    <div className=" flex flex-col gap-2 py-1 px-10">
      <div className=" flex justify-between  text-sm font-extrabold">
        {" "}
        <p>Members</p>
        <p>Live: {peopleCount}</p>
      </div>
      <div className="flex gap-2 p-1">
        {members.map((member, i) => (
          <div key={i} className=" p-1">
            <Avatar size="50px" src={member.profileImage} alt="ABDS"></Avatar>
            <p className=" text-sm">{member.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchPartyVideoDetails;
