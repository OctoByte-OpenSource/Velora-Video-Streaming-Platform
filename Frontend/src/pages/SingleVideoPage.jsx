import { AppLayout } from "@/AppComponents/Layout/AppLayout";
import VideoDetails from "@/AppComponents/Misc/VideoDetails";
import VideoPlayer from "@/AppComponents/Misc/VideoPlayer";
import Comment from "@/AppComponents/Misc/comment";
import { useParams } from "react-router-dom";

const SingleVideoPage = () => {
  const videoId = useParams().id;
  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        <VideoPlayer videoId={videoId} />
        <VideoDetails />
        <Comment />
      </div>
    </div>
  );
};

export default AppLayout()(SingleVideoPage);
