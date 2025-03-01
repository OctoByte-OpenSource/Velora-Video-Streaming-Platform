import { AppLayout } from "@/AppComponents/Layout/AppLayout";
import ChatBox from "@/AppComponents/Misc/ChatBox";
import VideoDetails from "@/AppComponents/Misc/VideoDetails";
import VideoPlayer from "@/AppComponents/Misc/VideoPlayer";
import WatchPartyVideoPlayer from "@/AppComponents/Misc/WatchPartyVideoPlayer";
import Avatar from "@/AppComponents/Utility/Avatar";
import WatchPartyVideoDetails from "@/AppComponents/Video/WatchPartyVideoDetails";
import {
  JOIN_ROOM,
  ROOM_DATA,
  VIDEO_PAUSE,
  VIDEO_PLAY,
} from "@/constants/socketEvent";
import { useSocketEventListner } from "@/hooks/hook";
import { getSocket } from "@/socket";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const WatchPartyPage = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("usser", user);
  const roomName = useParams().id;

  const [roomData, setRoomData] = useState(null);
  const [peopleCount, setPeopleCount] = useState(0);
  const [members, setMembers] = useState([]);

  const socket = getSocket();

  const roomDataHandler = (data) => {
    console.log(data);
    setRoomData(data.room);
    setPeopleCount(data.peopleCount);
    setMembers(data.members);
    // setMembers((prev) => [...prev, members]);
  };

  const socketEvents = {
    [ROOM_DATA]: roomDataHandler,
  };
  useSocketEventListner(socket, socketEvents);

  useEffect(() => {
    socket?.emit(JOIN_ROOM, { roomName });
  }, [socket]);

  return (
    <div className="  ">
      <h1 className=" text-center  p-1 text-lg font-medium ">Watch Party </h1>
      <div className="flex  gap-10 px-5  justify-center">
        <div className=" flex-[3] flex flex-col gap-2">
          <WatchPartyVideoPlayer
            videoId={roomData?.videoId}
            socket={socket}
            roomName={roomName}
          />
          <WatchPartyVideoDetails members={members} peopleCount={peopleCount} />
        </div>
        <div className="flex-[1]  max-sm:hidden">
          <ChatBox peopleCount={peopleCount} />
        </div>
      </div>
    </div>
  );
};

export default AppLayout()(WatchPartyPage);
