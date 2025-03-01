import { useSocketEventListner } from "@/hooks/hook";
import { useGetSingleVideoQuery } from "@/redux/api/videoApiSlice";
import ReactPlayer from "react-player/lazy";

const VideoPlayer = ({
  url,
  videoId,
  isSingleVideo = true,
  roomName,
  socket,
}) => {
  console.log(url);
  // const [video_url, setVideo_url] = useState("");

  const { data, isError, isLoading, error } = useGetSingleVideoQuery(videoId);

  console.log(data);

  return (
    <div className="w-[70vw] h-[70vh] mx-auto mt-10">
      <ReactPlayer
        className="rounded-3xl mx-auto"
        width="100%"
        height="100%"
        url={data?.data.video_url}
        controls
      />
    </div>
  );
};

export default VideoPlayer;
