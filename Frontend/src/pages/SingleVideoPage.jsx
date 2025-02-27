import VideoDetails from '@/AppComponents/Misc/VideoDetails'
import VideoPlayer from '@/AppComponents/Misc/VideoPlayer'
import Comment from '@/AppComponents/Misc/comment'

const SingleVideoPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        <VideoPlayer/>
        <VideoDetails/>
        <Comment/>
      </div>
    </div>
  )
}

export default SingleVideoPage