import DashBoard from "@/pages/DashBoard";
import React from "react";
import { data } from "@/data/data";
import Card from "../Card";

const ProfileVideoCards = () => {
  return (
    <div className=" flex flex-col p-2  items-center gap-2">
      <p className=" text-lg font-medium">videos</p>
      <div className=" ">
        <div className="grid  grid-cols-3 gap-10 pl-2 pr-10 pt-2 pb-2">
          {data?.map((video) => (
            // console.log("Hello", video.thumbnail)
            <Card
              key={video.id}
              thumbnail={video.thumbnail}
              description={video.description}
              channel_name={video.channel_name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileVideoCards;
