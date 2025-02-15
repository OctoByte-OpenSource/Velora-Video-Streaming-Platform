import VideoDetails from '@/AppComponents/Misc/VideoDetails'
import VideoPlayer from '@/AppComponents/Misc/VideoPlayer'
import Comment from '@/AppComponents/Misc/comment'

const SingleVideoPage = () => {
  return (
    <div className='flex'>
      <div>
        <VideoPlayer/>
        <VideoDetails/>
      </div>
      <div className='absolute right-16 mt-5 top-20'>
        <Comment/>
      </div>
    </div>
  )
}

export default SingleVideoPage