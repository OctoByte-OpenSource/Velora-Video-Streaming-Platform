import React from "react";
import Avatar from "../Utility/Avatar";
import moment from "moment";

const Message = ({ message }) => {
  const time = moment(message?.createdAt);
  const formattedTime = time.format("HH:mm A");
  return (
    <div
      className={` flex flex-col  px-4 py-1 w-fit rounded-lg ${
        message.sender._id === "67a893f259c5cfe5849e1351"
          ? "ml-auto bg-gray-200 text-gray "
          : " bg-green-500 "
      }  break-words`}
    >
      <p className="  text-blue-700 text-xs">{message?.sender?.username}</p>
      {/* <Avatar size={"40px"} src={message?.sender?.profileImg} /> */}
      <div className=" w-[150px]  text-sm">{message?.content}</div>
      <p className=" w-full text-end text-gray-500 text-[10px]">
        {formattedTime}
      </p>
    </div>
  );
};

export default Message;
