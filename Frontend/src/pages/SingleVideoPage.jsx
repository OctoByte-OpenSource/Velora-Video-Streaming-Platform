import { AppLayout } from "@/AppComponents/Layout/AppLayout";
import VideoDetails from "@/AppComponents/Misc/VideoDetails";
import VideoPlayer from "@/AppComponents/Misc/VideoPlayer";
import Comment from "@/AppComponents/Misc/comment";
import { useParams } from "react-router-dom";

const SingleVideoPage = () => {
  const videoId = useParams().id;
  return (
    <div className="flex">
      <div>
        <VideoPlayer videoId={videoId} />
        <VideoDetails />
      </div>
      <div className="absolute right-16 mt-5 top-20">
        <Comment />
      </div>
    </div>
  );
};

export default AppLayout()(SingleVideoPage);
