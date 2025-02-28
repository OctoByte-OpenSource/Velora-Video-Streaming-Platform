import { SEEK_TO, VIDEO_PAUSE, VIDEO_PLAY } from "@/constants/socketEvent";
import { useSocketEventListner } from "@/hooks/hook";
import { useGetVideoQuery } from "@/redux/api/videoApiSlice";
import { getSocket } from "@/socket";
import { useRef, useState } from "react";
import ReactPlayer from "react-player//lazy";

const VideoPlayer = ({
  url,
  videoId,
  isSingleVideo = true,
  roomName,
  socket,
}) => {
  console.log(url);
  // const [video_url, setVideo_url] = useState("");

  const { data, isError, isLoading, error } = useGetVideoQuery(videoId);

  console.log(data);
  const myVideo = useRef(null);

  // console.log(data?.data?.video_url);

  //socket events and handlers
  const videoPlayHandler = ({ trackTime, roomName }) => {
    console.log("playing");
    myVideo.current.seekTo(trackTime);
    // myVideo.current.play();
    console.log(myVideo.current.getInternalPlayer());
    myVideo?.current?.getInternalPlayer()?.playVideo();
  };
  const videoPauseHandler = ({ trackTime }) => {
    console.log("pasue");
    myVideo.current.seekTo(trackTime);
    myVideo.current.getInternalPlayer().pauseVideo();
  };

  const videoSeekToHandler = ({ trackTime }) => {
    myVideo.current.seekTo(trackTime);
    myVideo.current.getInternalPlayer().play();
  };

  const emitPlay = () => {
    console.log("emit play", 1);
    const trackTime = myVideo.current.getCurrentTime();
    socket?.emit(VIDEO_PLAY, { trackTime, roomName });
  };
  const emitPause = () => {
    const trackTime = myVideo.current.getCurrentTime();
    socket?.emit(VIDEO_PAUSE, { trackTime, roomName });
  };
  const emitSeekTo = () => {
    const trackTime = myVideo.current.getCurrentTime();
    socket?.emit(SEEK_TO, { trackTime, roomName });
  };

  const socketEvents = {
    [VIDEO_PLAY]: videoPlayHandler,
    [VIDEO_PAUSE]: videoPauseHandler,
  };
  useSocketEventListner(socket, socketEvents);

  return (
    <div className="min-w-[50%] flex flex-col h-[70%]   gap-3">
      <ReactPlayer
        ref={myVideo}
        className="rounded-3xl"
        width="100%"
        height="100%"
        url="https://www.youtube.com/watch?v=ivWJnB0NIyU" //{data?.data.video_url} //
        controls={isSingleVideo}
        onPause={emitPause}
        playing={true}
        onPlay={emitPlay}
      ></ReactPlayer>
    </div>
  );
};

export default VideoPlayer;
