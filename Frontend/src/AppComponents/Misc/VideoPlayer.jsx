import ReactPlayer from "react-player/lazy";

const VideoPlayer = () => {
  return (
    <div className="w-[90vw] h-[70vh] mx-auto mt-10">
      <ReactPlayer
        className="rounded-3xl mx-auto"
        width="100%"
        height="100%"
        url="https://www.youtube.com/watch?v=zaoLwh3txoU"
        controls
      />
    </div>
  );
};

export default VideoPlayer;