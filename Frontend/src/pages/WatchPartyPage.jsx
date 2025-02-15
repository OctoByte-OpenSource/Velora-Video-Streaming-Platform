import ChatBox from "@/AppComponents/Misc/ChatBox";
import VideoDetails from "@/AppComponents/Misc/VideoDetails";
import VideoPlayer from "@/AppComponents/Misc/VideoPlayer";
import { useSelector } from "react-redux";


const WatchPartyPage = () => {

  const user = useSelector((state) => state.auth.user);
  console.log(user)

  return (
    <div className="flex">
      {/* left section */}
      <div>
        {/* video */}
          <VideoPlayer></VideoPlayer>

          {/* Channel Details */}
          <VideoDetails></VideoDetails>
      </div> 

      {/* right section */}
      {/* Chatbox */}
      <div className="absolute left-[62%] top-[5%] pt-2">
        <ChatBox></ChatBox>
      </div>

    </div>
  )
}

export default WatchPartyPage