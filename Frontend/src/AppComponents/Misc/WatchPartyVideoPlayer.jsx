import { SEEK_TO, VIDEO_PAUSE, VIDEO_PLAY } from "@/constants/socketEvent";
import { useErrors, useSocketEventListner } from "@/hooks/hook";
import { useGetSingleVideoQuery } from "@/redux/api/videoApiSlice";
import { getSocket } from "@/socket";
import { useRef, useState } from "react";
import ReactPlayer from "react-player//lazy";
import CircleLoader from "../Loaders/CircleLoader";

const WatchPartyVideoPlayer = ({
  url,
  videoId = "",
  isSingleVideo = true,
  roomName,
  socket,
}) => {
  console.log(url);
  // const [video_url, setVideo_url] = useState("");
  if (!videoId) return <CircleLoader />;

  const { data, isError, isLoading, error } = useGetSingleVideoQuery(videoId);

  const errors = [{ isError: isError, error: error }];

  useErrors(errors);

  console.log(data);
  const myVideo = useRef(null);

  //socket events and handlers
  const videoPlayHandler = ({ trackTime, roomName }) => {
    myVideo.current.seekTo(trackTime);

    myVideo?.current?.getInternalPlayer()?.play();
  };
  const videoPauseHandler = ({ trackTime }) => {
    myVideo.current.seekTo(trackTime);
    myVideo.current.getInternalPlayer().pause();
  };

  const emitPlay = () => {
    const trackTime = myVideo.current.getCurrentTime();
    socket?.emit(VIDEO_PLAY, { trackTime, roomName });
  };
  const emitPause = () => {
    const trackTime = myVideo.current.getCurrentTime();
    socket?.emit(VIDEO_PAUSE, { trackTime, roomName });
  };

  const socketEvents = {
    [VIDEO_PLAY]: videoPlayHandler,
    [VIDEO_PAUSE]: videoPauseHandler,
  };
  useSocketEventListner(socket, socketEvents);

  return (
    <div>
      <div className="min-w-[50vw] flex flex-col  ">
        <ReactPlayer
          ref={myVideo}
          className="rounded-3xl"
          width="100%"
          height="100%"
          url={data?.data.video_url} //
          controls={isSingleVideo}
          onPause={emitPause}
          onPlay={emitPlay}
        />
      </div>
      <p className=" p-1">{data?.data.title}</p>
    </div>
  );
};

export default WatchPartyVideoPlayer;
