import ReactPlayer from "react-player//lazy";

const VideoPlayer = () => {
  return (
        <div className="w-[50%] flex flex-col ml-20 mt-20 gap-3">
                <ReactPlayer
                className="rounded-3xl"
                width="100%"
                height="100%"
                url="https://s3.us-east-1.amazonaws.com/temp-videos.rhishikesh.dev/videos/video-720p.mp4" controls></ReactPlayer>
        </div>

  )
}

export default VideoPlayer